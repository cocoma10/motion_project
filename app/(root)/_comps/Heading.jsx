"use client";
import React from "react";
import { Button } from "./../../../components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Heading = () => {
  return (
    <div className="relative overflow-hidden ">
      <div className="mx-auto lg:ml-6 lg:flex lg:items-center lg:justify-center max-w-3xl md:flex md:items-center md:justify-center lg:translate-x-[130px] w-fit">
        <div className="z-10" >
          <h1 className="text-center text-1xl sm:text-3xl md:text-4xl md:text-left lg:text-left font-bold lg:w-[650px] lg:ml-12 uppercase" style={{ lineHeight: "47px" }}>
            Your Ideas Documents, & Notes. Unified. Welcome to{" "}
            <span className="border border-black rounded-full text-[30px] p-2 px-4 dark:border dark:border-white" id="motion">
              Motion
            </span>
          </h1>
          <h3 className="text-center text-base md:text-left lg:text-left text-[10px] md:text-[14px] font-light lg:ml-12 mt-2 italic">
            motion is the connected workspace where <br /> better, faster work
            happens.
          </h3>
        </div>

        <Image
          src="/gifff.gif"
          width={6000}
          height={880}
          className="w-64 ml-10 md:-translate-y-14 lg:w-[1700px] md:w-[1300px] lg:-translate-y-[19px] dark:hidden"
          alt="Documents"
          unoptimized={true}
        />

        <Image
          src="/gifff.gif"
          width={6000}
          height={880}
          className="blur-xl w-64 ml-10 md:-translate-y-14 lg:w-[1700px] md:w-[1300px] lg:-translate-y-14 dark:block hidden dark:lg:-translate-y-[1px] dark:lg:-translate-x-[30px]"
          alt="Documents"
          unoptimized={true}
        />
      </div>

      {/* Add a scrolling effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-white opacity-0 transition duration-500 ease-in-out">
        {/* Add a scroll trigger */}
        <div className="h-screen"></div>
      </div>
    </div>
  );
};

export default Heading;