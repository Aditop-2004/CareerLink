import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob,
} from "../controllers/job.controller.js";
import isRecruiter from "../middlewares/isRecruiter.js";

const router = express.Router();

router.route("/post").post(isRecruiter, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").get(isRecruiter, getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);

export default router;
