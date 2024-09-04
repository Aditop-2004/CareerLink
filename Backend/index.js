// const express =require("express");
import express from "express";

//It parses the Cookie header from incoming HTTP requests and makes the cookies available as a JavaScript object (req.cookies) in your request handler. This means you can easily access the cookies sent by the client (e.g., a web browser) without having to manually decode or parse the raw cookie string.
import cookieParser from "cookie-parser";
const app = express();

//for cross origin and running both backend and frontend parallely on different ports
import cors from "cors";

// the dotenv package is commonly used to load these environment variables into process.env, making them accessible throughout your application.
import dotenv from "dotenv";
dotenv.config({});

import connectToDatabase from "./utils/db.js";

app.get("/", (req, res) => {
  // return res.status(200).json({
  //    message:"I am coming from backend",
  //    success:"true",
  // })
  res.send("I am fine");
});

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
const corsOptions = {
  origin: "https//localhost:5173", //by default in vite raect app
  credentials: true,
};
app.use(cors(corsOptions));

const port = 5000;
app.listen(port, () => {
  connectToDatabase();
  console.log(`Server listening at port ${port}`);
});