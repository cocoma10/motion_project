"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Toaster, toast } from "sonner";

const Create_Note = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [NoteColor, setNoteColor] = useState("");
  const [description, setDescription] = useState("");

  const { user } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !NoteColor || !description) {
      toast.warning("All Fields Are required");
      return;
    }
    const user_id = user?.id;
    try {
      const res = await fetch("http://localhost:3000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, title, NoteColor, description }),
      });
      if (res.ok) {
        const data = await res.json();
        setTitle("");
        setNoteColor("");
        setDescription("");
        toast("Note created");
        window.location.reload(); // Refresh the page

      } else {
        toast.error("Failed to create a Note");
      }
    } catch (error) {
      toast.error("Failed to create a Note");
    }
  };

  
  return (
    <div className="">
      <div className="">
        <Dialog className="">
          <DialogTrigger>
            <p className=''>Add Note</p>
          </DialogTrigger>
          <DialogContent className="w-[300px] bg-white">
            <DialogHeader>
              <DialogTitle>Add a Note</DialogTitle>
              <DialogDescription>
                <form onSubmit={handleSubmit}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Note Title</Label>
                      <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        id="title"
                        placeholder="Title of your Note"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Note Description</Label>
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
                    value={NoteColor}
                    onChange={(e) => setNoteColor(e.target.value)}
                  >
                    <option value="">Select a color</option>
                    <option value="#FDF0FE">PURPLE</option>
                    <option value="#B2DFFF">BLUE</option>
                    <option value="#FFD7D7">RED</option>
                    <option value="#FFF1BF">YELLOW</option>
                    <option value="#CCF4B8">GREEN</option>
                  </select>

                  <div className="flex justify-between mt-2">
                    <Button type="submit">Add Note</Button>
                  </div>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <Toaster richColors />
    </div>
  );
};

export default Create_Note;
