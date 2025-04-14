import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableCaption,
  TableHeader,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";
export default function ApplicationTable() {
  const allAppliedJobs = useSelector((state) => state.job.allAppliedJobs);
  const convertdate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };
  // console.log(allAppliedJobs);
  return (
    <div className="max-w-7xl mx-auto mt-8 mr-10 ml-10 bg-blue-50">
      <Table>
        {/* <TableCaption>A list of yout applied jobs </TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-lg text-purple-500">
              Date
            </TableHead>
            <TableHead className="font-bold text-lg text-purple-500">
              Job Role
            </TableHead>
            <TableHead className="text-left font-bold text-lg text-purple-500">
              Company
            </TableHead>
            <TableHead className="text-right font-bold text-lg text-purple-500">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="text-base">
                {convertdate(item.createdAt)}
              </TableCell>
              <TableCell className="text-base">{item.job.title}</TableCell>
              <TableCell className="text-base">
                {item.job.company.name}
              </TableCell>
              <TableCell className="text-right">
                <Badge>{item.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
