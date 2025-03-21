import React from "react";
import { Badge } from "./ui/badge";

export default function LatestJobCard({ job }) {
  const { title, description, salary, location, jobType, position, company } =
    job;
  return (
    <div
      className="p-3 outline rounded-lg flex flex-col gap-2"
      style={{ backgroundColor: "#b4faf6" }}
    >
      <div>
        <h1 className="text-2xl font-serif font-bold">{company.name}</h1>
        <p className="font-extralight text-1xl mb-0 ">{location}</p>
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-red-600">{title}</h1>
        <p>{description}</p>
      </div>
      <div className="flex gap-1 justify-center">
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
    </div>
  );
}
