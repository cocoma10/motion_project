import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import NotesBar from "./NotesBar";
import { AlignJustify } from "lucide-react";
import { Button } from "./ui/button";
const Sidebar = () => {
  return (
    <div>
      <Sheet className="bg-black">
        <SheetTrigger>
          {" "}
          <AlignJustify size={17} className="mt-2 cursor-pointer borde " />
        </SheetTrigger>
        <SheetContent
          className="w-[250px] sm:w-[540px] backdrop-blur-sm bg-[#EEF7FF]/45"
          side="left"
        >
          <SheetHeader>
            <SheetTitle>Motion Platform</SheetTitle>
            <SheetDescription>
              <Button variant="link">
                <a href="/">Welcome</a>
              </Button>{" "}
              <br />
              <Button variant="link">
                <a href="/home">Home</a>
              </Button>
              <br />
              <Button variant="link">
                <a href="/calendar">Calendar</a>
              </Button>
              <br />
              <Button className="hover:border-b border-black w-[65px] bg-transparent text-black hover:bg-transparent rounded-none ml-4">
                <NotesBar />
              </Button>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Sidebar;
