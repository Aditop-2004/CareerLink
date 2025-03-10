// the dotenv package is commonly used to load these environment variables into process.env, making them accessible throughout your application.
//isko sabse pehle load krna padta hai
//Agar .env variables undefined aa rahe hain, to ensure karo ki dotenv ko sabse pehle load kiya ho, .env file me koi space na ho, aur server restart kiya ho.
import dotenv from "dotenv";
dotenv.config({});


// const express =require("express");
import express from "express";

//It parses the Cookie header from incoming HTTP requests and makes the cookies available as a JavaScript object (req.cookies) in your request handler. This means you can easily access the cookies sent by the client (e.g., a web browser) without having to manually decode or parse the raw cookie string.
import cookieParser from "cookie-parser";
const app = express();

import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

//for cross origin and running both backend and frontend parallely on different ports
import cors from "cors";


import connectToDatabase from "./utils/db.js";

//These are actually route handlers and
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "I am coming from backend",
    success: "true",
  });
  // res.sendFile(__dirname + "/index.html");
});

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//express.json() → JSON body handle karta hai
// express.urlencoded({ extended: true }) → Form-data handle karta hai

app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173", //by default in vite raect app
  credentials: true,
};
app.use(cors(corsOptions));

const port = process.env.PORT || 5000;

//using the apis for different uses (jiske liye route banaye)
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
//it will be like localhost/api/v1/user/register

app.listen(port, () => {
  connectToDatabase();
  console.log(`Server listening at port ${port}`);
});
