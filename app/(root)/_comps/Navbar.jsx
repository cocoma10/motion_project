"use client";
import React from "react";
import { cn } from "./../../../lib/utils";
import Logo from "./Logo";
import { ModeToggle } from "../../../components/mode-toggle";
import { useUser, UserButton, SignInButton } from "@clerk/nextjs";
import { Button } from "../../../components/ui/button";
//import { Spinner } from "../../../components/spinner";
import Sidebar from "./../../../components/Sidebar";
import Link from "next/link";
const Navbar = () => {
  const { user } = useUser();

  return (
    <div
      className={cn(
        "z-50  dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-8 h-12 backdrop-blur-sm bg-white/30 "
      )}
    >
      <Sidebar />
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {/* if not authenticated */}

        {/* isLoading &&(
                    <Spinner/>
                )} */}

        {user ? (
          <div>
            {" "}
            <Button variant="ghost" size="sm">
              <Link href="/home" className="mr-1 border border-black px-2 py-1 rounded-full font-semibold dark:border-white">Enter Motion</Link>
            </Button>
            
            <UserButton afterSignOutUrl="/" />
          </div>
        ) : (
          <div>
            <SignInButton mode="modal">
              <Button
                variant="ghost"
                size="sm"
                className="border border-black rounded-full mr-2"
              >
                Log in
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size="sm">Get Motion free in</Button>
            </SignInButton>
          </div>
        )}

        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
