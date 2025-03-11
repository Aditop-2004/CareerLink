//schema for company type and info
import mongoose from "mongoose";
//Here we are assuming that a recruiter can post the postings of multiple companies but a company can only be posted by one recruiter
const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    website: {
      type: String,
    },
    location: {
      type: String,
    },
    logo: {
      type: String, //URL to company logo
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId, //userId of the recruiter
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
export const Company = mongoose.model("Company", companySchema);
