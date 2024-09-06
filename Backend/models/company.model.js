//schema for company type and info
import mongoose from "mongoose";
const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    website: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    logo: {
      type: String, //URL to company logo
      required: true,
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
