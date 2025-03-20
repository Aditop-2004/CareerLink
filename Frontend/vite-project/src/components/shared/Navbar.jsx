import React, { useState } from "react";
import { Button } from "../ui/button";
import { Link, NavLink } from "react-router-dom";
// Import components as usual
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
export default function Navbar() {
  // const [user, setUser] = useState(null); // Mock user state
  const user = false;
  return (
    <div className="bg-blue-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold mx-5">
            Career<span className="text-[#F83002]">Link</span>
          </h1>
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
                <li>
                  <NavLink
                    to="/jobs"
                    className={({ isActive }) =>
                      isActive ? "text-red-500" : ""
                    }
                  >
                    Jobs
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/browse"
                    className={({ isActive }) =>
                      isActive ? "text-red-500" : ""
                    }
                  >
                    Browse
                  </NavLink>
                </li>
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
                    <Avatar className="pointer-cursor mr-4">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>X</AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-60">
                    <div>
                      <h4 className="font-medium text-[blue]">
                        Aditya Chaturvedi
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        A passionate coder
                      </p>
                    </div>
                    <div>
                      <div
                        style={{ marginLeft: "0px" }}
                        className="flex w-fit items-center gap-2 cursor-pointer"
                      >
                        <Button variant="link">View Profile</Button>
                      </div>
                      <div
                        style={{ marginLeft: "0px" }}
                        className="flex w-fit items-center gap-2 cursor-pointer"
                      >
                        <Button variant="link">Logout</Button>
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
