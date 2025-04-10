import React from "react";
import Navbar from "../shared/Navbar";
import ApplicationTable from "./ApplicationTable";
import usegetAllApplicationsForGivenJobId from "../customhooks/usegetAllApplicationsForGivenJobId";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function JobApplicants() {
  const params = useParams();
  const jobId = params.id;
  //   console.log(jobId);
  usegetAllApplicationsForGivenJobId(jobId);
  const applications = useSelector(
    (state) => state.application.jobapplications
  );

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto "></div>
      <h1 className="font-bold text-xl my-10 mx-4">
        Job Applicants({applications.length})
      </h1>
      <ApplicationTable></ApplicationTable>
    </div>
  );
}
