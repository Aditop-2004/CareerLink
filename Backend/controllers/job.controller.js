import { Job } from "../models/job.model.js";
import { Globalskills } from "../models/globalskills.model.js";
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

    // Validation
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

    // Normalize requirements
    const skillArray = requirements
      .split(",")
      .map((skill) => skill.trim().toLowerCase())
      .filter((skill) => skill.length > 0);

    // Create job
    const job = await Job.create({
      title,
      description,
      requirements: skillArray,
      salary: Number(salary),
      location,
      jobType,
      experience,
      position,
      company: companyId,
      created_by: userId,
    });

    // Prepare update object for $inc
    const skillUpdateMap = {};
    skillArray.forEach((skill) => {
      skillUpdateMap[`skills.${skill}`] = 1;
    });

    // Update skill counts
    await Globalskills.updateOne(
      { _id: 1 },
      { $inc: skillUpdateMap },
      { upsert: true }
    );

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

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const jobs = await Job.aggregate([
      {
        $lookup: {
          from: "companies", // Collection name, usually plural and lowercase
          localField: "company",
          foreignField: "_id",
          as: "company",
        },
      },
      {
        $unwind: "$company", // Turn company from array into object
      },
      {
        $match: {
          $or: [
            { title: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
            { requirements: { $regex: keyword, $options: "i" } },
            { "company.name": { $regex: keyword, $options: "i" } },
          ],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    if (!jobs || jobs.length === 0) {
      return res.status(200).json({
        jobs: [],
        success: true,
        message: "No jobs match your search criteria.",
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (err) {
    console.error("Error in getAllJobs:", err);
    return res.status(400).json({
      message: "kuch to gadbad hai daya",
      success: false,
    });
  }
};

//to get the job details by the job id
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id; //like yha hame jo id hai vo uske route se hi milegi
    //like /get/:id
    const job = await Job.findById(jobId).populate([
      { path: "company" },
      { path: "created_by" },
      { path: "applications" },
    ]);
    //using populate method to also get the company info whose job is posted
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
    const adminId = req.id; //jis id se login kiya gya hai
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
    });
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
