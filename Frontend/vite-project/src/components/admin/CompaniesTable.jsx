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
import { Edit2, MoreHorizontal } from "lucide-react";
// import { Button } from "../ui/button";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// http://localhost:5000/api/v1/job/getadminjobs
export default function CompaniesTable() {
  //recruiter ki sari companies ki ham redux state banaege but jo filter karte samay ham locally useState banaoge
  const companies = useSelector((state) => state.company.companies);

  const navigate = useNavigate();
  const [filtercompany, setFilterCompany] = useState(companies);
  const searchText = useSelector((state) => state.company.filter);
  const datefinder = (date) => {
    const newDate = new Date(date);
    return newDate.toDateString();
  };

  useEffect(() => {
    const filteredCompanies =
      companies.length >= 0 &&
      companies.filter((company) => {
        return company.name.toLowerCase().includes(searchText.toLowerCase());
      });
    setFilterCompany(filteredCompanies);
  }, [searchText, companies]); //matlab chahe filtertext change ho ya original companies change ho jayenge

  return (
    <div className="max-w-6xl mx-auto my-10 ">
      <Table>
        <TableCaption>A list of your registered companies</TableCaption>
        <TableHeader className="bg-yellow-100">
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-blue-50">
          {filtercompany &&
            filtercompany.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={item.logo || "https://github.com/shadcn.png"}
                    />
                  </Avatar>
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{datefinder(item.createdAt)}</TableCell>
                <TableCell className=" cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal></MoreHorizontal>
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        className="flex items-center gap-2 w-fit cursor-pointer"
                        onClick={() => navigate(`/admin/companies/${item._id}`)}
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
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
