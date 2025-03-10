import React from "react";
import { Badge } from "./ui/badge";

export default function LatestJobCard() {
  return (
    <div
      className="p-3 outline rounded-lg"
      style={{ backgroundColor: "#b4faf6" }}
    >
      <div>
        <h1 className="text-2xl font-serif font-bold">Company Name</h1>
        <p className="font-extralight text-1xl mb-0 ">India</p>
      </div>
      <div>
        <h1 className="text-red-600">Job Title</h1>
        <p>hi hello this is the job description</p>
      </div>
      <div>
        <Badge
          className="text-blue-500 font-bold m-1 cursor-pointer bg-slate-50"
          variant=""
        >
          12 positions
        </Badge>
        <Badge
          className="text-blue-500 font-bold m-1 cursor-pointer bg-slate-50"
          variant=""
        >
          Part Time
        </Badge>
        <Badge
          className="text-blue-500 font-bold border m-1 cursor-pointer bg-slate-50"
          variant=""
        >
          24 Lpa
        </Badge>
      </div>
    </div>
  );
}
