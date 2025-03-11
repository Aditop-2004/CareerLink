import express from "express";
import {
  login,
  logout,
  register,
  UpdateProfile,
} from "../controllers/user.controller.js";
const router = express.Router();

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

//yha jaise ham post,put aur get use karnege waise hi ham nodemon me test karte samay bhi rakhege
router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);

//we will make a middleware to authenticate the user before updating the profile
router.route("/profile/update").patch(isAuthenticated, UpdateProfile);
// ye hamne patch use kiya na ki put kyunki patch me ham sirf wo fields bhejte hai jo chnage krni hoti hai aur put me puri body bhejte hai yani sri fields even if that field is not changed
//thus patch is more efficient in terms of bandwidth.
export default router;
