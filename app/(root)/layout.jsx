"use client";
import Navbar from "./_comps/Navbar";
import Footer from "./_comps/Footer";
import Link from "next/link";
import { SquareChevronLeft, Variable, Weight } from "lucide-react";
import { useState } from "react";
//import localfont from "next/font/local"

const menuItems = [
  {
    href: "/",
    title: "Home",
  },
  {
    href: "/dashboard",
    title: "Dashboard",
  },
  {
    href: "/test",
    title: "test",
  },
];
/*
const Jetbrain = localfont({
  src : [
    {
      path:"../../public/JetBrainsMono-2.304/fonts/ttf/JetBrainsMono-Regular.ttf",
      Weight: "700",
    },
    
  ],
  Variable: "--font-Jetbrain"
}) */
export default function RootLayout({ children }) {
  return (
    <div className="h-screen flex-grow  mt-10 ">
      <Navbar />
      <div className="flex flex-col md:flex-row flex-1">
        <main className="mx-auto h-full pt-24 w-full"> {children}</main>
      </div>

      <div className="bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
}
