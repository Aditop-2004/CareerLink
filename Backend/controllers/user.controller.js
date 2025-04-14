import { response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import uploadOnCloudinary from "../utils/cloudinary.js";
//Yha ham wo backend ka routes call me jo function pass karte hai wo define kar rhe
export const register = async (req, res) => {
  try {
    //if user does not enter anything in some of the fields
    // console.log(req.body);
    // console.log(req.file);
    const { fullname, email, phonenumber, password, role } = req.body;
    // console.log("hi", req.body);
    if (!fullname || !email || !phonenumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    // console.log(user);

    //if user with this name already exists as a registered user
    if (user) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
    }
    //hashing the password with bcrypt (hashing 10 times)
    const hashedPassword = await bcrypt.hash(password, 10);
    let profilePhotoUrl = "";
    if (req.file) {
      const response = await uploadOnCloudinary(req.file.path);
      profilePhotoUrl = response.secure_url;
      // console.log(profilePhotoUrl);
    }
    // console.log(response);
    //creating a new user
    await User.create({
      fullname,
      email,
      phonenumber,
      password: hashedPassword,
      role,
      profile: {
        bio: "",
        skills: [],
        resume: "",
        profilePhoto: profilePhotoUrl,
      },
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "kuch to garbad hai daya",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    // console.log(email, password, role);
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    // console.log("hi");
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
    // console.log(role, user.role);
    if (role !== user.role) {
      return res.status(400).json({
        message: "account doesn't exist with the current role.",
        success: false,
      });
    }
    //user is verified (means shi banda hai)
    //ab hame token banana padega
    //yha dekho stateless kaam chal rha hai
    //yhi token banke client side bhejenge
    //ab koi bhi protective route use karte samay request me token bhejenge
    const tokenData = {
      userId: user._id,
    };
    //signing the token data with the secret key
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      phonenumber: user.phonenumber,
      profile: user.profile,
    };

    //to avoid the hacker to get the token
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, //1 day validity of the cookie
        httpsOnly: true, //It ensures that the cookie is only accessible through HTTP(S) requests, not by JavaScript.
        sameSite: "strict", //This enforces a strict same-site policy, meaning the cookie will only be sent if the request originates from the same domain.
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "kuch to garbad hai daya",
      success: false,
    });
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
    return res.status(400).json({
      message: "kuch to garbad hai daya",
      success: false,
    });
  }
};

export const UpdateProfile = async (req, res) => {
  try {
    const { fullname, email, phonenumber, bio, skills } = req.body;
    // console.log(req.body);
    if (skills) var skillsArray = skills.split(",");
    const userId = req.id; //from middleware authentication
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    // console.log("hel");
    //updating the data
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phonenumber) user.phonenumber = phonenumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;
    // console.log("hel");
    //!abhi resume nhi upload ho paa rha
    if (req.file) {
      const response = await uploadOnCloudinary(req.file.path, {
        resource_type: "raw",
      });
      const resumeURL = response.secure_url;
      user.profile.resume = resumeURL;
    }
    // console.log(user);
    // console.log("hel");
    //actually this is what is actually changing the data in the database
    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phonenumber: user.phonenumber,
      role: user.role,
      profile: user.profile,
    };
    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    // console.log(error);
    return res.status(400).json({
      message: "kuch to garbad hai daya",
      success: false,
    });
  }
};
export const getProfile = async (req, res) => {
  try {
    const userId = req.id;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (e) {
    return res.status(400).json({
      message: "kuch to garbad hai daya",
      success: false,
    });
  }
};
