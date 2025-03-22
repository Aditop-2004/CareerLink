import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useParams } from "react-router-dom";
import Navbar from "./shared/Navbar";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "../utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { useSelector } from "react-redux";

export default function JobDescription() {
  const params = useParams();
  const jobId = params.id;
  const user = useSelector((state) => state.auth.user);
  const [job, setJob] = useState(null);
  const [isApplied, setIsApplied] = useState(false);

  // Function to fetch job details and update state
  const fetchJob = async () => {
    try {
      const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        const fetchedJob = res.data.job;
        console.log(fetchedJob);
        setJob(fetchedJob);
        setIsApplied(
          fetchedJob.applications.some(
            (application) => String(application.applicant) === String(user._id)
          )
        );
        console.log("Fetched Job:", fetchedJob);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (jobId && user?._id) {
      fetchJob();
    }
  }, [jobId, user._id]);

  // Apply for the job and re-fetch job details after applying
  const applyForJob = async () => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        // Re-fetch job details to update isApplied status
        fetchJob();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // Format the job posting date
  const createdAt = job?.createdAt;
  const dateObj = new Date(createdAt);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = dateObj.toLocaleDateString(undefined, options);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-10 my-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-xl">{job?.title}</h1>
            <div className="flex items-center gap-2 mt-4">
              <Badge
                className="text-blue-700 font-bold hover:bg-slate-400 cursor-pointer"
                variant="ghost"
              >
                {job?.position} positions
              </Badge>
              <Badge
                className="text-red-700 font-bold hover:bg-slate-400 cursor-pointer"
                variant="ghost"
              >
                {job?.jobType}
              </Badge>
              <Badge
                className="text-[#7209b7] font-bold hover:bg-slate-400 cursor-pointer"
                variant="ghost"
              >
                {job?.salary} LPA
              </Badge>
            </div>
          </div>
          <Button
            disabled={isApplied}
            onClick={applyForJob}
            className={`rounded-lg ${
              isApplied
                ? "bg-slate-600 cursor-not-allowed"
                : "bg-[#7209b7] cursor-pointer"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
        <h1 className="border-b-2 border-b-gray-300 font-medium py-3">
          Job Description
        </h1>
        <div>
          <h1 className="font-bold my-1">
            Role:
            <span className="pl-4 font-normal text-gray-800">{job?.title}</span>
          </h1>
          <h1 className="font-bold my-1">
            Location:
            <span className="pl-4 font-normal text-gray-800">
              {job?.location}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Description:
            <span className="pl-4 font-normal text-gray-800">
              {job?.description}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Minimum Experience:
            <span className="pl-4 font-normal text-gray-800">
              {job?.experience} years
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Salary:
            <span className="pl-4 font-normal text-gray-800">
              {job?.salary} LPA
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Total Applicants:
            <span className="pl-4 font-normal text-gray-800">
              {job?.applications.length}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Posted on:
            <span className="pl-4 font-normal text-gray-800">
              {formattedDate}
            </span>
          </h1>
        </div>
      </div>
    </>
  );
}
