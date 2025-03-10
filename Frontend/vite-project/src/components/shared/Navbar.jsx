import React, { useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
// Import components as usual

export default function Navbar() {
  const [user, setUser] = useState(null); // Mock user state

  return (
    <div style={{ backgroundColor: "#e7f2f8" }}>
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
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </span>
              {!user ? (
                <div className="flex gap-5 mx-5">
                  <Button variant="outline" className="hover:bg-[#c0c0c0]">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button variant="outline" className="hover:bg-[#c0c0c0]">
                    <Link to="/signup">Register</Link>
                  </Button>
                </div>
              ) : (
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar className="pointer-cursor">
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
