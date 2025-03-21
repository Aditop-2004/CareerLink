import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; //file system library of node.js(already imported by default)

cloudinary.config({
  cloud_name: "deaqibbrj",
  api_key: "852729651797537",
  api_secret: "cXG5AEuR5zQocsSOJWng3EBDOTI",
});

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) {
      throw new Error("File path is required");
    }

    // const ext = path.extname(filePath).toLowerCase();
    // const isPDF = ext === ".pdf";
    // Upload the file
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto", //auto detects the type of file being uploaded
    });

    console.log("File has been uploaded successfully");

    fs.unlinkSync(filePath); //removes the temporary file uploaded to the local server(by the multer middleware actually)
    // Return the response(containing the url of the uploaded file)
    return response;
  } catch (error) {
    console.log(error);
    // Attempt to remove the temporary file, if it exists
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (unlinkError) {
      console.error("Error removing temporary file:", unlinkError.message);
    }

    throw error; // Re-throw the error to be handled by the calling function if needed
  }
};

export default uploadOnCloudinary;
