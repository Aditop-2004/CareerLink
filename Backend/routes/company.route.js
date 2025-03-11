import express from "express";
const router = express.Router();

import isAuthenticated from "../middlewares/isAuthenticated.js";
import isRecruiter from "../middlewares/isRecruiter.js";
import {
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controllers/company.controller.js";

router.route("/register").post(isRecruiter, registerCompany);
router.route("/get").get(isRecruiter, getCompany);
router.route("/get/:id").get(isRecruiter, getCompanyById);
router.route("/update/:id").patch(isRecruiter, updateCompany);

export default router;
