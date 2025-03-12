//for image uploading functionality
//make sure that you firstly install it using npm i command at backend before importing it
//you need to add whenever you are uploading the image

// import multer from "multer";
// const storage=multer.memoryStorage();
// export const singleUpload=multer({storage}).single("file");//ye same as .jsx file me jab image upload krte samay jo type honga

//you can learn about multer at its documentation
//https://www.npmjs.com/package/multer
//there will be two options either to upload the file on memory or on disk storage
//but since we are using cloudinary we will be using disk storage
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads"); // Location where the file will be stored temporarily(but might not be visible to you because while implementing it we will be using cloudinary on which we have unlinked the temporary file uploaded to the local server)
  },
  filename: function (req, file, cb) {
    //for making the file name unique even if the same file is uploaded again by the same user or different user with same name
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });
export default upload;
