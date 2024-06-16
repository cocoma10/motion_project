"use client";
import { useEffect, useState } from "react";
import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { NotepadText } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../../components/ui/carousel";
import { format, parseISO } from "date-fns";
import Link from "next/link";
const Notes_Caro = () => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const fetching = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/notes");
        const data = await res.json();
        // descending order
        const sortedNotes = data.notes.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNotes(sortedNotes);
      } catch (error) {
        toast.error("Failed to fetch notes");
      }
    };
    fetching();
  }, []);
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className=" mx-auto w-[850px]"
    >
      <CarouselContent>
        {notes?.map((note, index) => (
          <CarouselItem key={index} className=" md:basis-1/2 lg:basis-1/5">
            <div className="w-[200px] ">
              <Link href={`singleNote/${note._id}`}>
                <Card
                  className="ml-[40px] rounded-[12px] border border-black"
                  style={{ backgroundColor: note?.NoteColor }}
                >
                  <CardContent className="relative aspect-square justify-center p-2 ">
                    <div className="text-1xl font-semibold text-[#686D76]">
                      note
                    </div>
                    <div className="text-1xl font-bold">{note?.title}</div>
                    <div className=" text-[8px] rounded-full bg-black w-fit px-2 py-[2px] text-white">
                      <p className="">
                        {format(parseISO(note.createdAt), "eeee do")}
                      </p>
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-end translate-x-[110px] -translate-y-[10px]">
                      <NotepadText size={35} />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Notes_Caro;
