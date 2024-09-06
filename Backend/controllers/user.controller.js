import { response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
//Yha ham wo backend ka routes call me jo function pass karte hai wo define kar rhe
export const register = async (req, res) => {
  try {
    //if user does not enter anything in some of the fields
    const { fullname, email, phoneNumber, password, role } = req.body;
    console.log(req.body);
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Somthing is missing",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    //if user with this name already exists as a registered user
    if (user) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
    }
    //hashing the password with
    const hashedPassword = await bcrypt.hash(password, 10);

    //creating a
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "No existing account with this email",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect password",
        success: false,
      });
    }
    if (role !== user.role) {
      return res.status(400).json({
        message: "account doesn't exist with the current role.",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const UpdateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    //!cloudinary wala code idhar aayega
    if (skills) var skillsArray = skills.split(",");
    const userId = req.id; //from middleware authentication
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    //updating the data
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skillsArray) user.profile.skills = skillsArray;

    //!uploading the resume part using the cloudinary comes here

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
