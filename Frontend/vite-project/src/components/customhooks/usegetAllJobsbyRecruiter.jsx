import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT } from "../../utils/constant";
import { setAdminJobs } from "../../redux/jobSlice";
// http://localhost:5000/api/v1/job/getadminjobs
export default function usegetAllJobsbyRecruiter() {
  const dispatch = useDispatch();
  useEffect(() => {
    const meth = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
          withCredentials: true,
        });
        dispatch(setAdminJobs(res.data.jobs));
        //console.log(res.data.jobs);
      } catch (error) {
        console.log(error);
      }
    };
    meth();
  }, []);
}
