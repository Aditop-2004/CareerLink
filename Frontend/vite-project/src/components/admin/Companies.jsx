import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import getAllCompaniesbyRecruiter from "../customhooks/usegetAllCompaniesbyRecruiter";
import { use } from "react";
import { setFilter } from "../../redux/companySlice";
import { useDispatch } from "react-redux";

export default function Companies() {
  getAllCompaniesbyRecruiter();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setFilter(input));
  }, [input]);
  //yha hamne iski state isliye reux me save kri kyunki usko hame companies table me use krenge (although ham prop bhi pass kar sakte the)
  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5 ">
          <Input
            className="max-w-4xl"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          ></Input>
          <Button
            onClick={() => {
              navigate("/admin/companies/create");
            }}
          >
            New Company
          </Button>
        </div>
      </div>
      <CompaniesTable />
    </div>
  );
}
