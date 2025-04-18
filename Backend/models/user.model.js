//schema for user login and signup(whether a student or a recruiter)
import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phonenumber: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Student", "Recruiter"],
      required: true,
    },
    profile: {
      bio: { type: String },
      skills: [{ type: String }], //array of strings
      resume: { type: String },//url to resume file
      resumeOriginalName: { type: String },
      company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },//this the current company I guess he is working for
      //just like a foreign key
      profilePhoto: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true }
  // These fields are timestamps that represent when the document was created and last updated.
  //By setting { timestamps: true }, you're telling Mongoose to automatically manage these timestamp fields for you, so you don't need to add them manually to the schema.
);
export const User = mongoose.model("User", userSchema);

//ab in schemas ko ham controllers me apis banate samay import krenge
