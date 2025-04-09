import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import {
  SelectLabel,
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectSeparator,
} from "../../components/ui/select";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { JOB_API_END_POINT } from "../../utils/constant";
export default function JobsCreate() {
  const companiesbyRecruiter = useSelector((state) => state.company.companies);
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const changeEventHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };
  const navigate = useNavigate();
  const submitHandler = async (event) => {
    event.preventDefault();
    //  console.log(input);
    try {
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectChangeHandler = (value) => {
    const company = companiesbyRecruiter.find(
      (company) => company._id === value
    );
    setInput({ ...input, companyId: company._id });
  };
  return (
    <>
      <Navbar />
      {companiesbyRecruiter.length > 0 ? (
        <div className="max-w-xl mx-auto my-10">
          <form onSubmit={submitHandler}>
            <Link to="/admin/companies">
              <div className="flex items-center gap-5 p-8">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 text-gray-500 font-semibold"
                  onClick={() => navigate("/admin/jobs")}
                >
                  <ArrowLeft />
                  <span>Back</span>
                </Button>
              </div>
            </Link>
            <div className="p-8 border-blue-200 shadow-lg rounded-md">
              <h1 className="font-bold text-xl">Job Post</h1>
              <div className="flex flex-col gap-4 p-8">
                <div className="flex gap-4">
                  <div>
                    <Label>Title</Label>
                  </div>
                  <Input
                    type="text"
                    name="title"
                    value={input.title}
                    onChange={changeEventHandler}
                  />
                </div>
                <div className="flex gap-4">
                  <div>
                    <Label>Description</Label>
                  </div>
                  <Input
                    type="text"
                    name="description"
                    value={input.description}
                    onChange={changeEventHandler}
                  />
                </div>
                <div className="flex gap-4">
                  <div>
                    <Label>Requirements</Label>
                  </div>

                  <Input
                    type="text"
                    name="requirements"
                    value={input.requirements}
                    onChange={changeEventHandler}
                  />
                </div>
                <div className="flex gap-4">
                  <div>
                    <Label>Salary(in LPA)</Label>
                  </div>

                  <Input
                    type="number"
                    name="salary"
                    value={input.salary}
                    onChange={changeEventHandler}
                  />
                </div>
                <div className="flex gap-4">
                  <div>
                    <Label>Location</Label>
                  </div>

                  <Input
                    type="text"
                    name="location"
                    value={input.location}
                    onChange={changeEventHandler}
                  />
                </div>
                <div className="flex gap-4">
                  <div>
                    <Label>JobType</Label>
                  </div>

                  <Input
                    type="text"
                    name="jobType"
                    value={input.jobType}
                    onChange={changeEventHandler}
                  />
                </div>
                <div className="flex gap-4">
                  <div>
                    <Label>Min Experience(in years)</Label>
                  </div>

                  <Input
                    type="text"
                    name="experience"
                    value={input.experience}
                    onChange={changeEventHandler}
                  />
                </div>
                <div className="flex gap-4">
                  <div>
                    <Label>No. of Positions</Label>
                  </div>

                  <Input
                    type="number"
                    name="position"
                    value={input.position}
                    onChange={changeEventHandler}
                  />
                </div>
                <div className="flex gap-4 w-fit">
                  <div>
                    <Label>Company Name</Label>
                  </div>
                  <div>
                    <Select onValueChange={selectChangeHandler}>
                      <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Select a company" />
                      </SelectTrigger>
                      <SelectContent>
                        {companiesbyRecruiter.map((company) => (
                          <SelectItem key={company._id} value={company._id}>
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full mt-8">
              Post job
            </Button>
          </form>
        </div>
      ) : (
        "Pls first register a company before posting a job"
      )}
    </>
  );
}
