import React, { useEffect, useState } from "react";
import LatestJobCard from "./LatestJobCard";
import { useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT } from "../utils/constant";

export default function LatestJobs() {
  const [jobsArray, setjobsArray] = useState([]); //used to limit the number of jobs displayed
  //we are already getting the jobs from the backend in the decending order of creation date which is stored in the same way in the redux state and we are using it here
  // const navigate = useNavigate();
  useEffect(() => {
    const meth = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          // console.log(res);
          setjobsArray(res.data.jobs);
        }
      } catch (error) {
        console.log(error);
      }
    };
    meth();
  }, []);
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2] ml-2">Latest </span>Job Openings
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5 p-3 ">
        {jobsArray
          .slice(0, Math.min(jobsArray.length, 3))
          .map((item, index) => (
            <LatestJobCard key={index} job={item} />
          ))}
      </div>
    </div>
  );
}
