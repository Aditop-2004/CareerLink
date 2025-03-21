import React, { useState } from "react";
import LatestJobCard from "./LatestJobCard";
import { useSelector } from "react-redux";

export default function LatestJobs() {
  const jobsArray = useSelector((state) => state.job.allJobs) || [];
  const jobstodisplay = useSelector((state) => state.job.allJobs.length); //used to limit the number of jobs displayed
  //we are already getting the jobs from the backend in the decending order of creation date which is stored in the same way in the redux state and we are using it here
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top </span>Job Openings
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5 p-3 ">
        {jobsArray.slice(0, jobstodisplay).map((item, index) => (
          <LatestJobCard key={index} job={item} />
        ))}
      </div>
    </div>
  );
}
