import { Bookmark } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

export default function Job({ job }) {
  const { title, description, salary, location, jobType, position, company } =
    job;

  //to calculate how many days ago the job was posted
  const date = new Date(job.createdAt);
  const today = new Date();
  const timeDiff = Math.abs(today - date);
  const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const navigate = useNavigate();
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border-gray-100 m-3 flex flex-col justify-between">
      <p className="text-sm text-gray-500">
        {daysAgo == 0 ? "Today" : `${daysAgo} days ago`}
      </p>
      <div className="flex items-center gap-3">
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark></Bookmark>
        </Button>
        <div className="flex items-center gap-4 ">
          <Button>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </Button>
          <div>
            <h1 className="font-medium text-lg">{company.name}</h1>
            <p className="text-sm text-gray-600">{location}</p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="font-bold lext-lg my-2">{title}</h1>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className="flex gap-1 my-2">
        <Badge
          className="text-blue-500 font-bold m-1 cursor-pointer bg-slate-50"
          variant=""
        >
          {position} positions
        </Badge>
        <Badge
          className="text-blue-500 font-bold m-1 cursor-pointer bg-slate-50"
          variant=""
        >
          {jobType}
        </Badge>
        <Badge
          className="text-blue-500 font-bold border m-1 cursor-pointer bg-slate-50"
          variant=""
        >
          {salary} Lpa
        </Badge>
      </div>
      <div className="flex items-center gap-3 mt-3">
        <Button
          variant="outline"
          className=""
          onClick={() => {
            navigate(`/description/${job._id}`);
          }}
        >
          Details
        </Button>
        <Button className="bg-[#7209b7]">Save for later</Button>
      </div>
    </div>
  );
}
