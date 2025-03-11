import express, { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from "../controllers/application.controller.js";
import isStudent from "../middlewares/isStudent.js";
import isRecruiter from "../middlewares/isRecruiter.js";
const router = express.Router();

router.route("/apply/:id").post(isStudent, applyJob);
router.route("/get").get(isStudent, getAppliedJobs);
router.route("/:id/applicants").get(isRecruiter, getApplicants);
router.route("/status/:id/update").patch(isRecruiter, updateStatus);

export default router;
