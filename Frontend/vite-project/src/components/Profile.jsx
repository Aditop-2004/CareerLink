import React from "react";
import { useSelector } from "react-redux";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Mail, Pen, Phone } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import ApplicationTable from "./ApplicationTable";
export default function Profile() {
  const user = useSelector((state) => state.auth.user);
  const skills = [];
  console.log(user);
  const isResume = user && user.profile && user.profile.resume ? true : false;
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-between flex-col">
        <div className="flex flex-col gap-3 bg-yellow-100 border border-gray-200 rounded-2xl my-5 p-8 ">
          <div className={"flex items-center gap-8 mb-3"}>
            <Avatar className="w-24 h-24">
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
            <div>
              <h1>{user.fullname}</h1>
              <p>Add your bio</p>
            </div>
            <Button className="text-right" variant="outline">
              <Pen />
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <p>Email:</p> <Mail />
            {user ? user.email : "xyz@gmail.com"}
          </div>
          <div className="flex items-center gap-3">
            <p>Phone</p>
            <Phone /> : {user ? user.phonenumber : "234567856"}
          </div>
          <div className="flex items-center gap-3">
            <p>Skills: </p>

            {user.profile.skills.length > 0 ? (
              user.profile.skills.map((item, index) => (
                <Badge key={index}>{item}</Badge>
              ))
            ) : (
              <span>No Skills</span>
            )}
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label className="text-md font-bold">Resume</Label>
            {isResume ? (
              <a href={resumeUrl} target="_blank" rel="noreferrer">
                <Button variant="outline">View Resume</Button>
              </a>
            ) : (
              <span>No Resume</span>
            )}
          </div>
        </div>
        <span className="text-3xl underline">Applied Jobs</span>
      </div>
      <ApplicationTable className=" mx-10"></ApplicationTable>
    </div>
  );
}
