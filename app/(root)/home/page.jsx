"use client";
import React, { useState, useEffect } from "react";
import Tasks from "./task_comps/Tasks";
import { Calendar } from "../../../components/ui/calendar";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { Toaster, toast } from "sonner";
import PomodoroTimer from "../_comps/Timer";
import Notes_Caro from "./_parts/Notes_Caro";
import NotesBar from "../../../components/NotesBar";
import Create_Note from "./_parts/Create_Note";
import { CalendarCheck, NotebookTabs, Timer } from "lucide-react";
const Page = () => {
  const [date, setDate] = useState(new Date());
  const [link, setLink] = useState(
    "https://open.spotify.com/embed/show/5VzFvh1JlEhBMS6ZHZ8CNO?utm_source=generator"
  );
  const { user } = useUser();
  const [newLink, setNewLink] = useState("");

  useEffect(() => {
    console.log("Selected date:", date);
  }, [date]);

  const handleLink = async (e) => {
    e.preventDefault();
    if (!newLink) {
      toast.warning("No link provided");
    } else {
      setLink(newLink);
    }
  };

  return (
    <div className="mb-26 mx-12 lg:-translate-y-[180px] md:-translate-y-[240px]">
      <div className="mx-auto lg:ml-7 lg:flex lg:items-center lg:justify-center max-w-3xl md:flex md:items-center md:justify-center">
        <div className="mx-auto text-center lg:ml-12">
          <div className="text-center text-1xl sm:text-3xl md:text-4xl md:text-left lg:text-left font-bold lg:w-[650px] lg:ml-12 uppercase">
            <h1
              className="flex text-center text-1xl sm:text-3xl md:text-4xl md:text-left lg:text-left font-bold lg:w-[650px] lg:ml-12 uppercase"
              style={{ lineHeight: "47px" }}
            >
              <CalendarCheck size={42} className="mr-1" />
              TO DO{" "}
              <span className="border-2 border-black rounded-full ml-[5px] px-4 text-[#686D76]">
                LIST
              </span>
            </h1>
            <Tasks />
          </div>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => setDate(newDate)}
          className="mx-auto w-[300px] mt-10 md:mt-10 lg:mt-[180px] md:w-fit rounded-[15px] border lg:ml-12"
          style={{ maxWidth: "400px", border: "1px solid black" }}
        />
      </div>

      {/* Notes */}
      <div className="mt-[50px]">
        <div className="md:mx-auto lg:ml-7 mb-[50px] ">
          <div className="text-1xl sm:text-3xl md:text-4xl md:text-left lg:text-left font-bold lg:w-[650px] uppercase">
            <h1
              className="flex text-1xl sm:text-3xl md:text-4xl md:text-left lg:text-left font-bold lg:w-[650px] uppercase"
              style={{ lineHeight: "47px" }}
            >
              {" "}
              <NotebookTabs size={42} className="mr-1" />
              NoteBook
              <span className="border-2 lowercase ml-[5px] border-black rounded-full px-4 text-[#686D76]">
                items
              </span>
            </h1>
          </div>
        </div>
        <Notes_Caro />
        <div className="flex items-center justify-center mx-auto mt-[35px]">
          <div className="mr-6 group relative inline-block text-sm font-medium text-black focus:outline-none focus:ring active:text-black">
            <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-black transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>
            <span className="relative block border border-current bg-white px-4 py-2">
              <Create_Note />
            </span>
          </div>

          <a
            className="mr-5 group relative inline-block text-sm font-medium text-black focus:outline-none focus:ring active:text-black"
            href="#"
          >
            <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-black transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

            <span className="relative block border border-current bg-white px-4 py-2">
              <NotesBar />
            </span>
          </a>
        </div>
      </div>

      <h1
        className="flex text-center text-1xl sm:text-3xl md:text-4xl md:text-left lg:text-left font-bold lg:w-[680px] lg:ml-12 uppercase mt-20 mb-5"
        style={{ lineHeight: "47px" }}
      >
        <CalendarCheck size={42} className="mr-1" />
        Paste and Save Your
        <span className="border-2 border-black rounded-full ml-[5px] px-4 text-[#686D76]">
          Playlist
        </span>
      </h1>
      <form
        className="flex justify-center items-center  mb-7"
        onSubmit={handleLink}
      >
        <Input
          type="text"
          placeholder="Link To your playlist"
          value={newLink}
          onChange={(e) => setNewLink(e.target.value)}
          className="w-[450px] mr-5"
        />
        <Button type="submit">Link</Button>
      </form>

      <iframe
        style={{ borderRadius: "12px" }}
        src={link}
        width="90%"
        height="450"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="mx-auto "
      />
            <Toaster richColors />


      <h1
        className="flex text-center text-1xl sm:text-3xl md:text-4xl md:text-left lg:text-left font-bold lg:w-[680px] lg:ml-12 uppercase mt-20 mb-5"
        style={{ lineHeight: "47px" }}
      >
        <Timer size={42} className="mr-1" />
        Pomodoro
        <span className="border-2 border-black rounded-full ml-[5px] px-4 text-[#686D76]">
          FOCUS
        </span>
      </h1>
      <div className="ml-12">
        <PomodoroTimer className="" />
      </div>

    </div>
  );
};

export default Page;

/*
https://open.spotify.com/embed/show/5VzFvh1JlEhBMS6ZHZ8CNO?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture

https://open.spotify.com/embed/album/1ijkFiMeHopKkHyvQCWxUa?utm_source=generator
*/