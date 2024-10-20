import React, { useState } from "react";
import { Button } from "../ui/button";
// Import components as usual

export default function Navbar() {
  const [user, setUser] = useState(null); // Mock user state

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Career<span className="text-[#F83002]">Link</span>
          </h1>
        </div>
        <div>
          <ul className="flex font-medium items-center gap-5">
            <div className="flex items-center gap-12">
              <span className="flex gap-5 font-bold text-[green]">
                <li>Home</li>
                <li>Jobs</li>
                <li>Browse</li>
              </span>
              {!user ? (
                <div className="flex gap-5">
                  <Button variant="outline" className="hover:bg-[#c0c0c0]">
                    Login
                  </Button>
                  <Button variant="outline" className="hover:bg-[#c0c0c0]">
                    Register
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
