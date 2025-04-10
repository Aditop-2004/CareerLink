import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  return (
    <div className="text-center m-4">
      <div className="flex flex-col gap-2 my-5">
        <span className="mx-auto px-4 py-2 rounded-full bg-yellow-100 text-[#F83002] font-medium m-1">
          No.1 Job Hunt Website
        </span>

        <h1 className="text-4xl font-bold m-2 mx-20">
          Your <span className="text-[red]">Dream Job</span> Awaits – Let’s
          Connect Talent with Opportunity.
        </h1>

        <div className="flex w-[40%] shadow-lg border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto bg-blue-50">
          <input
            type="text"
            placeholder="Find the opportunities in your dream company"
            className="outline-none border-none w-full bg-blue-50"
            onChange={(e) => setQuery(e.target.value)}
          ></input>
          <Button
            className="rounded-r-full bg-[#6A38C2]"
            onClick={searchJobHandler}
          >
            <Search className="h-5 w-5"></Search>
          </Button>
        </div>
      </div>
    </div>
  );
}
