import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import { setFilter } from "../../redux/jobSlice";
import usegetAllJobsbyRecruiter from "../customhooks/usegetAllJobsbyRecruiter";

export default function AdminJobs() {
  usegetAllJobsbyRecruiter();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setFilter(input));
  }, [input]);
  //yha hamne iski state isliye redux me save kri kyunki usko hame companies table me use krenge (although ham prop bhi pass kar sakte the)
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
              navigate("/admin/jobs/create");
            }}
          >
            Post new job
          </Button>
        </div>
      </div>
      <AdminJobsTable />
    </div>
  );
}
