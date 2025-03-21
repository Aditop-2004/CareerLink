import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export default function JobDescription() {
  const isApplied = false;
  return (
    <div className="max-w-7xl mx-10 my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">Frontend Developer</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge
              className={
                "text-blue-700 font-bold hover:bg-slate-400 cursor-pointer"
              }
              variant="ghost"
            >
              12 positions
            </Badge>
            <Badge
              className={
                "text-red-700 font-bold hover:bg-slate-400 cursor-pointer"
              }
              variant="ghost"
            >
              Full Time
            </Badge>
            <Badge
              className={
                "text-[#7209b7] font-bold hover:bg-slate-400 cursor-pointer"
              }
              variant="ghost"
            >
              24 LPA
            </Badge>
          </div>
        </div>
        <Button
          className={`rounded-lg ${
            isApplied
              ? "bg-slate-600 cursor-not-allowed"
              : "bg-[#7209b7] cusor-pointer"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium py-3">
        Job Description
      </h1>
      <div>
        <h1 className="font-bold my-1">
          Role:
          <span className="pl-4 font-normal text-gray-800">
            Frontend Developer
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Location:
          <span className="pl-4 font-normal text-gray-800">Hyderabad</span>
        </h1>
        <h1 className="font-bold my-1">
          Description:
          <span className="pl-4 font-normal text-gray-800">
            We are looking for a talented frontend developer to join our team.
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Experience(in years):
          <span className="pl-4 font-normal text-gray-800">2</span>
        </h1>
        <h1 className="font-bold my-1">
          Salary:
          <span className="pl-4 font-normal text-gray-800">12 LPA</span>
        </h1>
        <h1 className="font-bold my-1">
          Total Applicants:
          <span className="pl-4 font-normal text-gray-800">4</span>
        </h1>
        <h1 className="font-bold my-1">
          Posted on:
          <span className="pl-4 font-normal text-gray-800">12-06-2023</span>
        </h1>
      </div>
    </div>
  );
}
