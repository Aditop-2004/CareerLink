import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from "../../utils/constant";
import { setCompanies } from "../../redux/companySlice";

export default function usegetAllCompaniesbyRecruiter() {
  const dispatch = useDispatch();
  useEffect(() => {
    const meth = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          withCredentials: true,
        });
        dispatch(setCompanies(res.data.companies));
        // console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    meth();
  }, []);
}
