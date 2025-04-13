import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../../utils/constant";
import { setJobApplications } from "../../redux/applicationslice";

// http://localhost:5000/api/v1/application/67cff6837b3c067c4f569d1d/applicants
export default function usegetAllApplicationsForGivenJobId(jobId){
  //   console.log(jobId);
  const dispatch = useDispatch();
  //console.log("hi");
  useEffect(() => {
    const meth = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${jobId}/applicants`,
          {
            withCredentials: true,
          }
        );
        //console.log(res.data.applications);
        dispatch(setJobApplications(res.data.applications));
      } catch (error) {
        console.log(error);
      }
    };
    meth();
  }, []);
}
