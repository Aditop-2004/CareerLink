import mongoose from "mongoose";
const URI =
  "mongodb+srv://adityaonstudy:ShsHrmRBSB3J40zU@cluster0.bzjb1.mongodb.net/";
const connectToDatabase = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (err) {
    console.log("error connecting database", err);
  }
};
export default connectToDatabase;
