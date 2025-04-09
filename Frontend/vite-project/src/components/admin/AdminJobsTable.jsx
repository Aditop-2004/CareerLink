import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { toast } from "sonner";
import axios from "axios";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
// import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// http://localhost:5000/api/v1/job/getadminjobs
export default function AdminJobsTable() {
  //recruiter ki sari companies ki ham redux state banaege but jo filter karte samay ham locally useState banaoge
  const jobs = useSelector((state) => state.job.adminJobs);

  const navigate = useNavigate();
  const [filterjob, setFilterJob] = useState(jobs);
  const searchText = useSelector((state) => state.job.filter);
  const datefinder = (date) => {
    const newDate = new Date(date);
    return newDate.toDateString();
  };

  useEffect(() => {
    const filteredjobs =
      jobs.length >= 0 &&
      jobs.filter((jobs) => {
        return (
          jobs.title.toLowerCase().includes(searchText.toLowerCase()) ||
          jobs.company.name.toLowerCase().includes(searchText.toLowerCase()) ||
          jobs.description.toLowerCase().includes(searchText.toLowerCase())
        );
      });
    setFilterJob(filteredjobs);
  }, [searchText, jobs]); //matlab chahe filtertext change ho ya original companies change ho jayenge

  return (
    <div className="max-w-6xl mx-auto my-10 ">
      <Table>
        <TableCaption>A list of your jobs postings</TableCaption>
        <TableHeader className="bg-yellow-100">
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-blue-50">
          {filterjob &&
            filterjob.map((item, index) => (
              <TableRow key={index}>
                {/* <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={item.logo || "https://github.com/shadcn.png"}
                    />
                  </Avatar>
                </TableCell> */}
                <TableCell>{item.company.name}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{datefinder(item.createdAt)}</TableCell>
                <TableCell className=" cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal></MoreHorizontal>
                    </PopoverTrigger>
                    <PopoverContent className="w-fit">
                      <div
                        className="flex items-center gap-2 w-fit cursor-pointer"
                        onClick={() => navigate(`/admin/job/${item._id}`)}
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <br />
                      <div
                        className="flex items-center gap-2 w-fit cursor-pointer"
                        onClick={() =>
                          navigate(`/admin/jobs/applicants/${item._id}`)
                        }
                      >
                        <Eye className="w-4" />
                        <span>View Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
