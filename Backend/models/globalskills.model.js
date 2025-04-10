import mongoose from "mongoose";

const globalskillsSchema = new mongoose.Schema({
  _id: {
    type: Number,
    default: 1, // You can fix it to 1 to enforce singleton behavior
  },
  skills: {
    type: Map,
    of: Number, // Skill name -> count
    default: {},
  },
});

export const Globalskills = mongoose.model("Globalskills", globalskillsSchema);
