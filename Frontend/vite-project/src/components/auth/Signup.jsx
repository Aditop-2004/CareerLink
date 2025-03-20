import React, { useState } from "react";
import Navbar from "../shared/navbar";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import { Loader, Loader2 } from "lucide-react";

export default function Signup() {
  //setting up useState for the form data
  const [input, setInput] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    profilePicture: "",
  });

  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  // The square brackets ([]) around event.target.name are used for computed property names. This means that JavaScript dynamically sets the object key based on the value of event.target.name.
  const changeEventHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };
  const changeFileHandler = (event) => {
    setInput({ ...input, profilePicture: event.target.files?.[0] });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    // console.log(input);
    //since we are also taking image as input thus we needed to must use  formdata else we can use application/json
    const formData = new FormData();
    formData.append("fullname", input.name);
    formData.append("email", input.email);
    formData.append("phonenumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    // console.log(formData);
    if (input.profilePicture) {
      formData.append("file", input.profilePicture);
    }
    console.log(formData);
    //see how to integrate frontend and backend
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        // console.log(res.data);
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <>
      <div>
        <Navbar></Navbar>
      </div>
      <div className="my-20 bg-cover bg-center h-screen">
        <section className="bg-white dark:bg-gray-900 pt-16">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 bg-blue-50 border-grey-400 border-2">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
                </h1>
                <form
                  className="space-y-4 md:space-y-6 font-medium"
                  onSubmit={submitHandler}
                >
                  {/* Full Name Field */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      <span style={{ fontSize: "18px" }}>Full name</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={input.name}
                      onChange={changeEventHandler}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Rahul Gupta"
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      <span style={{ fontSize: "18px" }}>Email</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={input.email}
                      onChange={changeEventHandler}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="xyz@gmail.com"
                      required
                    />
                  </div>

                  {/* Phone Number Field */}
                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      <span style={{ fontSize: "18px" }}>Phone Number</span>
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      id="phoneNumber"
                      value={input.phoneNumber}
                      onChange={changeEventHandler}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="9876543210"
                      required
                    />
                  </div>

                  {/* Password Field */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      <span style={{ fontSize: "18px" }}>Password</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      value={input.password}
                      onChange={changeEventHandler}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>

                  {/* Image Upload Field */}
                  <div>
                    <label
                      htmlFor="profilePicture"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      <span style={{ fontSize: "18px" }}>Profile Picture</span>
                    </label>
                    <input
                      type="file"
                      name="profilePicture"
                      id="profilePicture"
                      onChange={changeFileHandler}
                      placeholder="Upload image"
                      accept="image/*"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>

                  {/* Account Type Radio Buttons */}
                  <div>
                    <label
                      htmlFor="role"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      <span style={{ fontSize: "18px" }}>Account Type</span>
                    </label>
                    <div className="flex items-center space-x-4 cursor-pointer">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="role"
                          id="student"
                          className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 focus:ring-2 dark:focus:ring-primary-600 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                          onChange={changeEventHandler}
                          checked={input.role === "Student"}
                          value="Student"
                          required
                        />
                        <label
                          htmlFor="student"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Student
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="role"
                          id="recruiter"
                          className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 focus:ring-2 dark:focus:ring-primary-600 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                          onChange={changeEventHandler}
                          checked={input.role === "Recruiter"}
                          value="Recruiter"
                          required
                        />
                        <label
                          htmlFor="recruiter"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Recruiter
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Terms and Conditions Checkbox */}
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        aria-describedby="terms"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="terms"
                        className="font-light text-gray-500 dark:text-gray-300"
                      >
                        I accept the{" "}
                        <Link
                          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                          to="#"
                        >
                          Terms and Conditions
                        </Link>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  {loading ? (
                    <Loader />
                  ) : (
                    <div className="flex  justify-center ">
                      <Button
                        type="submit"
                        variant="ghost"
                        className=" text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        <span style={{ border: "black", fontSize: "18px" }}>
                          Create an account
                        </span>
                      </Button>
                    </div>
                  )}

                  {/* Login Link */}
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Login here
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
