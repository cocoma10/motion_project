"use client";
import React, { useEffect, useState } from "react";
import { Checkbox } from "../../../../components/ui/checkbox";
import { SquarePlus, Eraser  } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { format, parseISO } from "date-fns";
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

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const { user } = useUser();

  useEffect(() => {
    const fetching = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/tasks");
        const data = await res.json();
        const userTasks = data.tasks.filter(
          (task) => task.user_id === user.id 
        ); 
        setTasks(userTasks);
      } catch (error) {
        console.log("Failed to fetch tasks");
      }
    };
    fetching();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task) {
      toast("Field required");
      return;
    }
    const user_id = user?.id; // Assuming user object has an id property
    try {
      const res = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, task }),
      });
      if (res.ok) {
        const data = await res.json();
        // Assuming the server returns the new task in the response
        const newTask = data.task;
        // Update the state with the new task
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setTask("");
        toast("Task created");
      } else {
        toast.error("Failed to create a task");
      }
    } catch (error) {
      toast.error("Failed to create a task");
    }
  };
  
  


//delete
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/tasks?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete task");
      }
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      toast("Task deleted");
    } catch (error) {
      toast.error(error.message);
    }
  };
//
  return (
    <div className=" mt-6 text-[18px] sm:text-1xl md:text-2xl lg:text-[18px] md:text-left lg:text-left lg:w-[650px] lg:ml-12 uppercase">
      <div className="w-fit py-1 lg:py-[1px] px-2 text-white flex border border-black bg-black lg:w-fit lg:px-3 rounded-[20px] ml-1 mb-2 cursor-pointer hover:bg-[#222831]">
        <Dialog className="">
          <DialogTrigger className="flex">
            <p className="text-[12px] font-medium lowercase">add task</p>
            <SquarePlus size={17} className="lg:translate-y-[8px] ml-1" />
          </DialogTrigger>
          <DialogContent className="w-[350px] bg-white rounded-[20px]">
            <DialogHeader>
              <DialogTitle>Add a Task</DialogTitle>
              <DialogDescription>
                <form onSubmit={handleSubmit}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Task Label</Label>
                      <Input
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        id="name"
                        placeholder="Name of your Task"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <Button type="submit">Add</Button>
                  </div>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      {tasks.length > 0 ? (
        <div className="mx-auto lg:ml-1 w-[300px] border border-black p-3 rounded-[20px] lg:w-[400px] text-[10px] lowercase">
          {tasks.map((t) => (
            <div
              key={t?._id}
              className="flex mb-2 ml-1 items-center space-x-2 text-gray-900 justify-between"
            >
              <div>
                <Checkbox
                  id="terms"
                  className="rounded-full translate-y-1 mr-2"
                />
                <label
                  htmlFor="terms"
                  className="text-[13px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t?.task}
                </label>
              </div>
              <div className="flex">
                <div className=" text-[7px] rounded-[20px] bg-[#FFD0D0] h-[20px] px-2 text-center">
                  <p className="translate-y-[5px] lg:-translate-y-[5px]">
                    {/* {format(parseISO(t?.createdAt), "eeee do")}*/}
                    {t?.createdAt
                      ? format(parseISO(t.createdAt), "eeee do")
                      : "N/A"}
                  </p>
                </div>
                <Eraser 
                  size={19}
                  className="ml-3 rounded-full cursor-pointer"
                  onClick={() => handleDelete(t?._id)}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex ml-1 items-center space-x-2 text-gray-500 border border-black w-[400px] p-2 rounded-[20px]">
          <Checkbox id="terms" className="rounded-full p-2" />
          <label
            htmlFor="terms"
            className="text-[13px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            to-do
          </label>
        </div>
      )}
    </div>
  );
};

export default Tasks;
