import React from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
//
const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];
export default function Jobs() {
  const jobsArray = useSelector((state) => state.job.allJobs);
  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-7xl mx-auto mt-8 mr-10 ml-3">
        <div className="flex gap-3">
          <div className="w-20%">
            <FilterCard></FilterCard>
          </div>

          {jobsArray.length === 0 ? (
            <div className="flex justify-center items-center  ">
              <div className="text-red-400 text-4xl text-center ml-96">
                No jobs available 😔
              </div>
            </div>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {jobsArray.map((item, index) => (
                  <Job index={index} job={item}></Job>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
