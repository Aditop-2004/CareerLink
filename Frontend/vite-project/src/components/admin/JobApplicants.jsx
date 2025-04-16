import React from "react";
import Navbar from "../shared/Navbar";
import ApplicationTable from "./ApplicationTable";
import usegetAllApplicationsForGivenJobId from "../customhooks/usegetAllApplicationsForGivenJobId";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { HandHelping } from "lucide-react";
import { useState } from "react";

export default function JobApplicants(){
  const params = useParams();
  const jobId = params.id;
  //console.log(jobId);
  usegetAllApplicationsForGivenJobId(jobId);
  const applications = useSelector(
    (state) => state.application.jobapplications
  );
  const [sort, setSort] = useState(false);
  const handleSort = () => {
    setSort(!sort);
  };
  //console.log(applications);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mx-4 my-10 gap-4">
          <h1 className="font-bold text-xl">
            Job Applicants({applications[0].length})
          </h1>
          <button
            className="px-6 py-2.5 bg-blue-500 text-white rounded-lg
                       shadow-md hover:shadow-xl 
                       hover:bg-blue-600 transform transition 
                       duration-200 ease-in-out 
                       hover:scale-105 active:scale-95"
            onClick={handleSort}
          >
            {sort ? "Sort by Date" : "Sort by Skills"}
          </button>
        </div>
      </div>
      <ApplicationTable sort={sort} />
    </div>
  );
  
}
