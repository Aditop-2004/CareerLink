//schema for job description by comapany for which the sttudent will apply
import mongoose from "mongoose";
const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    requirements: {
      type: [String],
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appliaction",
      },
    ],
  },
  { timestamps: true }
);
export const Job = mongoose.model("Job", jobSchema);
