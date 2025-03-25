import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSingleCompany } from "../../redux/companySlice";
import axios from "axios";
import usegetSingleCompanyById from "../customhooks/usegetSingleCompanyById";

export default function CompanySetup() {
  const params = useParams();

  usegetSingleCompanyById(params.id);

  const company = useSelector((state) => state.company.singleCompany);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    logo: null,
  });
  useEffect(() => {
    if (company) {
      setInput({
        name: company.name || "",
        description: company.description || "",
        website: company.website || "",
        location: company.location || "",
        logo: company.logo || null,
      });
    }
  }, [company]);

  const changeEventHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };
  const changeFileHandler = (event) => {
    setInput({ ...input, logo: event.target.files?.[0] });
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submitHandler = async (event) => {
    event.preventDefault();
    // console.log(input);
    //since we are also taking image as input thus we needed to must use  formdata else we can use application/json
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    formData.append("logo", input.logo);
    const company_id = params.id;
    // console.log(formData);
    try {
      const res = await axios.patch(
        `${COMPANY_API_END_POINT}/update/${company_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        navigate(`/admin/companies`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <Link to="/admin/companies">
            <div className="flex items-center gap-5 p-8">
              <Button
                variant="outline"
                className="flex items-center gap-2 text-gray-500 font-semibold"
                onClick={() => navigate("/admin/companies")}
              >
                <ArrowLeft />
                <span>Back</span>
              </Button>
            </div>
          </Link>
          <h1 className="font-bold text-xl">Company Setup</h1>
          <div className="flex flex-col gap-4 p-8">
            <div className="flex gap-4">
              <div>
                <Label>Name</Label>
              </div>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>
            <div className="flex gap-4">
              <div>
                <Label>Description</Label>
              </div>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div className="flex gap-4">
              <div>
                <Label>Website</Label>
              </div>

              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
              />
            </div>
            <div className="flex gap-4">
              <div>
                <Label>Location</Label>
              </div>

              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div className="flex gap-4">
              <div>
                <Label>Logo</Label>
              </div>

              <Input
                type="file"
                name="logo"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>
          </div>
          <Button type="submit" className="w-full mt-8">
            Save
          </Button>
        </form>
      </div>
    </>
  );
}
