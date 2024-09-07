import { Job } from "../models/job.model.js";

//to post a job by the recruiter
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experience: experience,
      position,
      company: companyId,
      created_by: userId,
    });
    return res.status(200).json({
      message: "New job created successfully",
      job,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "kuch to gadbad hai daya",
      success: false,
    });
  }
};

//to get all the jobs for a student
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    //for getting the keyword from the url that is used for filtering
    //ex: ....?keyword:"frontend"
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { title: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query);
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      message: "kuch to gadbad hai daya",
      success: false,
    });
  }
};

//to get the job deatils by the job id
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false,
      });
    }
    return res.status(200).json({ job, success: true });
  } catch (err) {
    return res.status(400).json({
      message: "kuch to gadbad hai daya",
      success: false,
    });
  }
};

//to show the jobs created by a recruiter
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false,
      });
    }
    return res.status(200).json({ jobs, success: true });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "kuch to gadbad hai daya",
      success: false,
    });
  }
};
