import { Bookmark } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

export default function Job() {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border-gray-100 m-3">
      <p className="text-sm text-gray-500">2 days ago</p>
      <div className="flex items-center gap-3">
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark></Bookmark>
        </Button>
        <div className="flex items-center gap-2 my-2">
          <Button>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </Button>
          <div>
            <h1 className="font-medium text-lg">Company Name</h1>
            <p className="text-sm text-gray-600">India</p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="font-bold lext-lg my-2">Job Title</h1>
        <p className="text-sm text-gray-600">
          hi hello this is the job description that you want to apply for
        </p>
      </div>
      <div className="flex gap-1 my-2">
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
      <div className="flex items-center gap-3 mt-3">
        <Button variant="outline" className="">
          Details
        </Button>
        <Button className="bg-[#7209b7]">Save for later</Button>
      </div>
    </div>
  );
}
