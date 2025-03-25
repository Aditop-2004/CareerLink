import React, { useState } from "react";
import { Button } from "../ui/button";
import { Link, NavLink, useNavigate } from "react-router-dom";
// Import components as usual
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { setUser } from "../../redux/authSlice";
export default function Navbar() {
  // const [user, setUser] = useState(null); // Mock user state
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  // console.log(user);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    const res = await axios.get(`${USER_API_END_POINT}/logout`, {
      withCredentials: true,
    });
    if (res.data.success) {
      // console.log(res);
      dispatch(setUser(null));
      navigate("/");
    } else {
      // console.log(res);
    }
  };
  // console.log(user);
  return (
    <div className="bg-blue-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <Link to="/">
            <h1 className="text-2xl font-bold mx-5">
              Career<span className="text-[#F83002]">Link</span>
            </h1>
          </Link>
        </div>
        <div>
          <ul className="flex font-medium items-center gap-5">
            <div className="flex items-center gap-12">
              <span className="flex gap-5 font-bold text-[green]">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "text-red-500" : "text-[green]"
                    }
                  >
                    Home
                  </NavLink>
                </li>
                {user && user.role === "Student" && (
                  <li>
                    <NavLink
                      to="/jobs"
                      className={({ isActive }) => `${
                        user
                          ? "cursor-pointer"
                          : "pointer-events-none cursor-not-allowed"
                      }
                    ${isActive ? "text-red-500" : ""}`}
                    >
                      Jobs
                    </NavLink>
                  </li>
                )}
                {user && user.role === "Student" && (
                  <li>
                    <NavLink
                      to="/browse"
                      className={({ isActive }) => `${
                        user
                          ? "cursor-pointer"
                          : "pointer-events-none cursor-not-allowed"
                      }
                    ${isActive ? "text-red-500" : ""}`}
                    >
                      Browse
                    </NavLink>
                  </li>
                )}
                {user && user.role === "Recruiter" && (
                  <li>
                    <NavLink
                      to="/admin/companies"
                      className={({ isActive }) => `${
                        user
                          ? "cursor-pointer"
                          : "pointer-events-none cursor-not-allowed"
                      }
                    ${isActive ? "text-red-500" : ""}`}
                    >
                      Companies
                    </NavLink>
                  </li>
                )}
                {user && user.role === "Recruiter" && (
                  <li>
                    <NavLink
                      to="/admin/jobs"
                      className={({ isActive }) => `${
                        user
                          ? "cursor-pointer"
                          : "pointer-events-none cursor-not-allowed"
                      }
                    ${isActive ? "text-red-500" : ""}`}
                    >
                      Jobs
                    </NavLink>
                  </li>
                )}
              </span>
              {!user ? (
                <div className="flex gap-5 mx-5">
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? "text-red-500" : ""
                    }
                  >
                    <Button variant="outline" className="hover:bg-[#c0c0c0]">
                      Login
                    </Button>
                  </NavLink>

                  <NavLink
                    to="/signup"
                    className={({ isActive }) =>
                      isActive ? "text-red-500" : ""
                    }
                  >
                    <Button variant="outline" className="hover:bg-[#c0c0c0]">
                      Register
                    </Button>
                  </NavLink>
                </div>
              ) : (
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar className="cursor-pointer mr-4">
                      <AvatarImage src={user.profile.profilePhoto} />
                      <AvatarFallback>X</AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-60">
                    <div>
                      <h4 className="font-medium text-[blue]">
                        {user.fullname}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {user.profile.bio}
                      </p>
                    </div>
                    <div>
                      {user && user.role === "Student" && (
                        <div
                          style={{ marginLeft: "0px" }}
                          className="flex w-fit items-center gap-2 cursor-pointer"
                        >
                          <Link to={"/profile"}>
                            <Button variant="link">View Profile</Button>
                          </Link>
                        </div>
                      )}
                      <div className="flex gap-2 cursor-pointer p-1">
                        <Button
                          variant="link"
                          onClick={handleLogout}
                          className="p-1 pt-0"
                        >
                          Logout
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
