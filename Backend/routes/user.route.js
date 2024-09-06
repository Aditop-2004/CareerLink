import express from "express";
import {
  login,
  logout,
  register,
  UpdateProfile,
} from "../controllers/user.controller.js";
const router = express.Router();
// import { User } from "../models/user.model";
import { User } from "../models/user.model.js";
// console.log(User);
import isAuthenticated from "../middlewares/isAuthenticated.js";

router.route("/register").post(register);
router.route("/login").post(login);

router.route("/logout").get(logout);

//we will make a middleware to authenticate the user before updating the profile
router.route("/profile/update").post(isAuthenticated, UpdateProfile);

export default router;
