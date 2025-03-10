import mongoose from "mongoose";
const URI =
  "mongodb+srv://adityaonstudy:ShsHrmRBSB3J40zU@cluster0.bzjb1.mongodb.net/";
// console.log(process.env.MONGO_URI);
const connectToDatabase = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Database connected");
  } catch (err) {
    console.log("error connecting database", err);
  }
};
export default connectToDatabase;
