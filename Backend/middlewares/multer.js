//for image uploading functionality
//make sure that you firstly install it using npm i command at backend before importing it  
//you need to add whenever you are uploading the image 

import multer from "multer";
const storage=multer.memoryStorage();
export const singleUpload=multer({storage}).single("file");
