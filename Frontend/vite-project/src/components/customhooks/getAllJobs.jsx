import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllJobs } from "../../redux/jobSlice";
import axios from "axios";
import { JOB_API_END_POINT } from "../../utils/constant";

export default function getAllJobs() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get`, {
          withCredentials: true,
        });
        dispatch(setAllJobs(res.data.jobs));
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllJobs();
  }, []);
}
