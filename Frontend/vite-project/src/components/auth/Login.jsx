import React, { useState } from "react";
import Navbar from "../shared/navbar";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import { Loader } from "lucide-react";
export default function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const loading = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changeEventHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(res.data);
      if (res.data.success) {
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      if (error.response) {
        // This block will handle specific server errors like 400
        console.log(error.response.data); // Log more info about the error
        toast.error(error.response.data.message || "Invalid input provided");
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        toast.error("No response received from server");
      } else {
        // Something else happened while making the request
        console.log(error.message);
        toast.error("An error occurred while sending the request");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <div className="my-5 bg-no-repeat bg-cover bg-center h-screen ">
        <section className="bg-white dark:bg-gray-900 pt-16">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div
              className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 bg-blue-50 border-grey-400 border-2"
              style={{ backgroundColor: "#e7f2f8" }}
            >
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Login
                </h1>
                <form
                  className="space-y-4 md:space-y-6 font-medium"
                  onSubmit={submitHandler}
                >
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

                  {loading ? (
                    <Loader />
                  ) : (
                    <div className="flex  justify-center">
                      <Button
                        type="submit"
                        variant="ghost"
                        className=" text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        <span style={{ border: "black", fontSize: "18px" }}>
                          Login
                        </span>
                      </Button>
                    </div>
                  )}

                  {/* Login Link */}
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Sign up here
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
