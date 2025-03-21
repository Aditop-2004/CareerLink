import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { setUser } from "../redux/authSlice";
// CareerLink\Frontend\vite-project\src\utils\constant.jsx

export default function UpdateProfileDialog({ open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [username, setUsername] = useState(user?.fullname);
  const [email, setEmail] = useState(user?.email);
  const [PhoneNumber, setPhoneNumber] = useState(user?.phonenumber);
  const [bio, setBio] = useState(user?.profile?.bio);
  const [skills, setSkills] = useState(
    user ? user.profile.skills.join(",") : ""
  );
  const dispatch = useDispatch();

  const [resume, setResume] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };
  const handleUserName = (e) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handleBio = (e) => {
    setBio(e.target.value);
  };
  const handleSkills = (e) => {
    setSkills(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    console.log(username, email, PhoneNumber, bio, skills);
    formData.append("fullname", username);
    formData.append("email", email);
    formData.append("phonenumber", PhoneNumber);
    formData.append("bio", bio);
    formData.append("skills", skills);
    //  console.log(formData);
    if (resume) formData.append("file", resume);
    // Add your update profile logic here
    //will call the update profile api here
    //see how to integrate frontend and backend
    try {
      const res = await axios.patch(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setOpen(false);
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      if (error.response) {
        // This block will handle specific server errors like 400
        console.log(error); // Log more info about the error
        toast.error(error.response.data.message || "Invalid input provided");
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        toast.error("No response received from server");
      } else {
        // Something else happened while making the request
        console.log(error.message);
        toast.error("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className={"sm:max-w-[425px]"}
          onInteractionOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="Name" className="text-right">
                  Name
                </Label>
                <Input
                  id="Name"
                  name="Name"
                  className="col-span-3"
                  value={username}
                  onChange={handleUserName}
                ></Input>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="Email" className="text-right">
                  Email
                </Label>
                <Input
                  id="Email"
                  name="Email"
                  className="col-span-3"
                  value={email}
                  onChange={handleEmail}
                ></Input>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="PhoneNumber" className="text-right">
                  PhoneNumber
                </Label>
                <Input
                  id="PhoneNumber"
                  name="PhoneNumber"
                  type="text"
                  className="col-span-3"
                  value={PhoneNumber}
                  onChange={handlePhoneNumber}
                ></Input>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="Bio" className="text-right">
                  Bio
                </Label>
                <Input
                  id="Bio"
                  name="Bio"
                  className="col-span-3"
                  value={bio}
                  onChange={handleBio}
                ></Input>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="Skills" className="text-right">
                  Skills
                </Label>
                <Input
                  id="Skills"
                  name="Skills"
                  className="col-span-3"
                  value={skills}
                  onChange={handleSkills}
                ></Input>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="Resume" className="text-right">
                  Resume
                </Label>
                <Input
                  id="File"
                  name="File"
                  type="file"
                  accept="application/pdf"
                  className="col-span-3"
                  onChange={handleFileChange}
                ></Input>
              </div>
            </div>
          </form>
          <DialogFooter>
            {loading ? (
              <Loader className="animate-spin w-10 h-10" />
            ) : (
              <Button type="submit" className="w-full" onClick={handleSubmit}>
                Update
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
