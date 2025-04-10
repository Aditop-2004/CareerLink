import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { APPLICATION_API_END_POINT } from "../../utils/constant";
import { setAllAppliedJobs } from "../../redux/jobSlice";
//http://localhost:5000/api/v1/application/get
const usegetAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
          withCredentials: true,
        });
      //   console.log(res);
        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.appliedJobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppliedJobs();
  }, []);
};

export default usegetAppliedJobs;
