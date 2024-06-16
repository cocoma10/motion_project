import React, { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { NotepadText } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { format, parseISO } from "date-fns";
import Link from "next/link";

const NotesBar = () => {
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
    <div>
      <Sheet className="bg-black w-fit">
        <SheetTrigger>notebook</SheetTrigger>
        <SheetContent
          className="w-fit sm:w-[540px] backdrop-blur-sm bg-[#B2DFFF]/45 overflow-y-scroll"
          side="right"
        >
          <SheetHeader>
            <SheetTitle>Your notes</SheetTitle>
            <SheetDescription>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto overflow-x-show -translate-x-7">
                {notes?.map((note) => (
                  <div className="w-[165px]" key={note._id}>
                    <Link href={`/singleNote/${note._id}`} key={note._id}>
                      <Card
                        className="ml-[40px] rounded-[12px] border border-black"
                        style={{ backgroundColor: note?.NoteColor }}
                      >
                        <CardContent className="relative aspect-square justify-center p-2">
                          <div className="text-1xl font-semibold text-[#686D76]">
                            note
                          </div>
                          <div className="text-1xl font-bold">
                            {note?.title}
                          </div>
                          <div className=" text-[8px] rounded-full bg-black w-fit px-2 py-[1px] text-white mt-2">
                            <p className="">
                              {format(parseISO(note.createdAt), "eeee do")}
                            </p>
                          </div>
                          <div className="absolute inset-0 flex flex-col justify-end translate-x-[80px] -translate-y-[10px]">
                            <NotepadText size={35} />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                ))}
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NotesBar;
