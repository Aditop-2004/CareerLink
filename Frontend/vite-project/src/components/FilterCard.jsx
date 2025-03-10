import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Banglore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Data Science",
      "Full Stack Developer",
      "Graphic Designer",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "40k-1lakh", "1lakh-5lakh"],
  },
];
export default function FilterCard() {
  return (
    <div>
      <h1 className="font-bold text-lg bg-white w-full p-3">Filter Jobs</h1>
      <hr className="mt-1"></hr>
      <RadioGroup>
        {filterData.map((data, index) => {
          return (
            <div className="my-2 ml-1">
              <h1 className="font-bold text-pretty text-purple-800">
                {data.filterType}
              </h1>
              {data.array.map((item, index) => {
                return (
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={item} />
                    <label>{item}</label>
                  </div>
                );
              })}
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
}
