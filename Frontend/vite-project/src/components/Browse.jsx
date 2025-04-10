import React from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useSelector } from "react-redux";
import usegetAllJobs from "./customhooks/usegetAllJobs";

export default function Browse() {
  usegetAllJobs();
  const alljobs = useSelector((state) => state.job.allJobs);
  console.log(alljobs);
  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10 mx-4">Search Results({0})</h1>
        <div className="grid grid-cols-3 gap-4">
          {alljobs.map((item, index) => {
            return <Job job={item} key={index}></Job>;
          })}
        </div>
      </div>
    </div>
  );
}
