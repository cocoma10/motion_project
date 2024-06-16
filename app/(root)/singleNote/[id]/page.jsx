"use client";
import React, { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { Toaster, toast } from "sonner";
import NotesBar from "../../../../components/NotesBar";

const Page = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [error, setError] = useState(null);
  const [hydrated, setHydrated] = useState(false); // Add hydrated state

  useEffect(() => {
    const fetching = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch Note");
        }
        const data = await res.json();
        setNote(data.note);
        setTitle(data.note?.title || "");
        setDescription(data.note?.description || "");
        setSelectedColor(data.note?.NoteColor || ""); // Initialize selectedColor correctly
      } catch (error) {
        setError(error.message);
      }
    };
    fetching();
  }, [id]);

  useEffect(() => {
    setHydrated(true); // Set hydrated to true on client side
  }, []);

  const handledit = async (e) => {
    e.preventDefault();
    try {
      const updatedNote = {
        newTitle: title !== note?.title ? title : undefined,
        newDescription:
          description !== note?.description ? description : undefined,
        newColor: selectedColor !== note?.NoteColor ? selectedColor : undefined, // Include newColor if it is different
      };

      const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedNote),
      });
      if (!res.ok) {
        throw new Error("Failed to update Note");
      }
      const data = await res.json();
      setNote(data.updatedNote);
      toast.success("Note updated successfully");
      window.location.reload(); // Refresh the page
    } catch (error) {
      toast.error("Failed to update Note");
    }
  };

  //delete
  const handleDelete = async (id) => {
    var result = confirm("Are you sure ?");
    if (result) {
      try {
        const res = await fetch(`http://localhost:3000/api/notes?id=${id}`, {
          method: "DELETE",
        });
        if (!res.ok) {
          throw new Error("Failed to delete note");
        }
        toast("Note deleted");
        router.push("/home");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  //

  if (!hydrated) {
    return null; // Prevent rendering until hydration is complete
  }

  return (
    <div className="ml-16 mb-60 -translate-y-[50px] dark:text-black">
      <p className="bg-black text-[25px] lg:ml-[45px] font-medium w-fit py-[1px] px-6 rounded-full text-[#B2DFFF]">
        NOTE{" "}
        <span className="ml-1 text-[17px] text-gray-400">
          {note?.createdAt
            ? format(parseISO(note.createdAt), "eeee do")
            : "N/A"}
        </span>
      </p>
      <div className="lg:flex lg:justify-around mt-5">
        <div
          className="w-fit border border-black p-3 rounded-[25px] px-6 lg:w-[480px] pb-8"
          style={{ backgroundColor: note?.NoteColor }}
        >
          <p className="font-medium lg:text-[30px]">{note?.title}</p>
          <p className="text-[10px] lg:text-[13px] mt-3">{note?.description}</p>
        </div>
        <div>
          <img
            src="/vid.gif"
            alt="My GIF"
            width={350}
            className="mx-auto mt-4 lg:mt-1 dark:bg-white dark:mt-2 dark:rounded-lg rounded-[25px]"
          />
          <div className="mx-auto flex lg:ml-4 items-center justify-center mt-[35px]">
            <Dialog>
              <DialogTrigger asChild>
                <span className="mr-5 group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring active:text-black cursor-pointer">
                  <span className="absolute inset-0 translate-x-1 translate-y-1 border border-black transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>
                  <span className="relative block border border-current bg-black px-4 py-2">
                    edit
                  </span>
                </span>
              </DialogTrigger>
              <DialogContent className="w-[300px] bg-white">
                <DialogHeader>
                  <DialogTitle>Edit your task</DialogTitle>
                  <DialogDescription >
                    <form onSubmit={handledit}>
                      <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name">Note Title</Label>
                          <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            id="name"
                            placeholder="Title of your Note"
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5 w-full">
                          <Label htmlFor="description">Note Body</Label>
                          <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            id="description"
                            placeholder="Body of your Note"
                            className="h-[200px] text-[10px] p-2 border border-gray-300 rounded"
                          />
                        </div>
                      </div>
                      <select
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                      >
                        <option value="">Select a color</option>
                        <option value="#FDF0FE">PURPLE</option>
                        <option value="#B2DFFF">BLUE</option>
                        <option value="#FFD7D7">RED</option>
                        <option value="#FFF1BF">YELLOW</option>
                        <option value="#CCF4B8">GREEN</option>
                      </select>

                      <div className="flex justify-between mt-2 text-[14px]">
                        <Button type="submit">edit</Button>
                      </div>
                    </form>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <span
              className="mr-5 group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring active:text-black cursor-pointer"
              onClick={() => handleDelete(id)}
            >
              <span className="absolute inset-0 translate-x-1 translate-y-1 border border-black transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>
              <span className="relative block border border-current bg-black px-4 py-2">
                delete
              </span>
            </span>
            <span className="mr-5 group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring active:text-black cursor-pointer">
              <span className="absolute inset-0 translate-x-1 translate-y-1 border border-black transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>
              <span className="relative block border border-current bg-black px-4 py-2">
                <NotesBar />
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
