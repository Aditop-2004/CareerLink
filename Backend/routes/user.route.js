import express from "express";
import {
  getProfile,
  login,
  logout,
  register,
  UpdateProfile,
} from "../controllers/user.controller.js";
const router = express.Router();

import isAuthenticated from "../middlewares/isAuthenticated.js";
import isStudent from "../middlewares/isStudent.js";
// import { singleUpload } from "../middlewares/multer.js";
import upload from "../middlewares/multer.js";

//yha jaise ham post,put aur get use karnege waise hi ham nodemon me test karte samay bhi rakhege

// "file" in upload.single("file") can be replaced with any other name, but it must match the name attribute used in the frontend when sending the file.
// formData.append("pic", profilePicture);
// axios.post("/api/register", formData);

router.route("/register").post(upload.single("file"), register);
router.route("/login").post(login);
router.route("/logout").get(logout);

//we will make a middleware to authenticate the user before updating the profile
router
  .route("/profile/update")
  .patch(isAuthenticated, upload.single("file"), UpdateProfile);
router.route("/getProfile").get(isStudent, getProfile);
// ye hamne patch use kiya na ki put kyunki patch me ham sirf wo fields bhejte hai jo chnage krni hoti hai aur put me puri body bhejte hai yani sri fields even if that field is not changed
//thus patch is more efficient in terms of bandwidth.
export default router;
