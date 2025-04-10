import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { APPLICATION_API_END_POINT } from "../../utils/constant";
import axios from "axios";
import { toast } from "sonner";

// http://localhost:5000/api/v1/application/status/67cffe85a55923db2faa0943/update
export default function ApplicationTable() {
  const shortlistingStatus = ["pending", "accepted", "rejected"];
  const applications = useSelector(
    (state) => state.application.jobapplications
  );
  const convertdate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };
  console.log(applications[0].applicant.profile.resume);

  const statusHandler = async (status, id) => {
    try {
      console.log(status, id);
      const res = await axios.patch(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(typeof applications);
  return (
    <div>
      <Table>
        <TableCaption>A list of applications for job posting </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application, index) => (
            <TableRow>
              <TableCell>{application.applicant.fullname}</TableCell>
              <TableCell>{application.applicant.email}</TableCell>
              <TableCell>{application.applicant.phonenumber}</TableCell>
              <TableCell>
                {application.applicant.profile.resume ? (
                  <Button
                    variant="outline"
                    onClick={() =>
                      window.open(application.applicant.profile.resume)
                    }
                  >
                    View Resume
                  </Button>
                ) : (
                  "No resume provided"
                )}
              </TableCell>
              <TableCell>{convertdate(application.createdAt)}</TableCell>
              <div className="flex justify-end">
                <TableCell className="text-right align-right">
                  <Select
                    onValueChange={(value) =>
                      statusHandler(value, application._id)
                    }
                  >
                    <SelectTrigger className="w-[100px] ">
                      <SelectValue placeholder="Action" />
                    </SelectTrigger>
                    <SelectContent>
                      {shortlistingStatus.map((status, id) => (
                        <SelectItem
                          key={id}
                          value={status}
                          className="cursor-pointer"
                        >
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
              </div>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
