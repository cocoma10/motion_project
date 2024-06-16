"use client";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useRouter } from "next/navigation";
import { Trash, Calendar, TableProperties } from "lucide-react";
import { Toaster, toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "../../../components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

export default function Home() {
  const { user } = useUser();
  console.log("id",user?.id)
  const router = useRouter();
  const [allEvents, setAllEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    user_id: user ? user.id : "", // Ensure user_id is initialized
    title: "",
    start: "",
    allDay: false,
  });

  useEffect(() => {
    console.log("Fetching events...");
    fetchEvents();
    console.log("User:", user);
    console.log("All events:", allEvents);
  }, [user]);

  const fetchEvents = async () => {
    try {
      if (!user) {
        console.error("User not authenticated.");
        return;
      }

      const response = await fetch("/api/events");
      if (response.ok) {
        const allEvents = await response.json();
        const userEvents = allEvents.events.filter(
          (event) => event.user_id === user.id || !event.user_id
        ); // Handle events without user_id
        setAllEvents(userEvents);
      } else {
        console.error("Failed to fetch events:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  const handleDateClick = (arg) => {
    setNewEvent({ ...newEvent, start: arg.dateStr, allDay: arg.allDay });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to create an event");
      return;
    }

    const newEventWithUserId = { ...newEvent, user_id: user.id };

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEventWithUserId),
      });

      if (response.ok) {
        await fetchEvents(); // Refetch events after creating a new one
        setNewEvent({
          user_id: user.id,
          title: "",
          start: "",
          allDay: false,
        }); // Clear form fields
      } else {
        console.error("Failed to create event:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to create event:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/events?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete event");
      }
      setAllEvents((prevEvents) =>
        prevEvents.filter((event) => event._id !== id) // Correct filtering
      );
      toast.success("Event deleted");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setNewEvent({
      ...newEvent,
      [name]: newValue,
    });
  };

  const eventContent = (arg) => {
    return {
      html: `<div style="background-color: #C4E4FF; color: black; height: 25px; padding: 3px; text-align: center; border: none; border-radius: 5px;">${arg.event.title}</div>`,
    };
  };

  return (
    <>
      <div className="mx-12 mb-10">
        <div className=" text-1xl sm:text-3xl md:text-4xl md:text-left lg:text-left font-bold lg:w-[650px] uppercase">
          <h1
            className="flex text-1xl sm:text-3xl md:text-4xl md:text-left lg:text-left font-bold lg:w-[650px]  uppercase"
            style={{ lineHeight: "47px" }}
          >
            <Calendar size={40} className="mr-1" />
            <p>Events</p>

            <span className="border-2 border-black rounded-full ml-[5px] px-4 text-[#686D76]">
              Calendar
            </span>
          </h1>
        </div>
        <div className="mt-6 text-[18px] sm:text-1xl md:text-2xl lg:text-[18px] md:text-left lg:text-left lg:w-[650px]uppercase">
          <div className="w-fit py-1 lg:py-[1px] px-2 text-black flex border border-black bg-[#686D76] lg:w-fit lg:px-3 rounded-[10px] ml-1 mb-2 cursor-pointer hover:bg-black hover:text-white">
            <Dialog>
              <DialogTrigger>
                <p className="text-[12px] font-bold w-[80px] uppercase">
                  add Event
                </p>
              </DialogTrigger>
              <DialogContent className="bg-white w-[150px] mx-auto lg:w-fit">
                <DialogHeader>
                  <DialogTitle>Create Event</DialogTitle>
                  <DialogDescription>
                    Fill in the details to create a new event.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="mt-2 p-2">
                    <input
                      type="text"
                      name="title"
                      value={newEvent.title}
                      onChange={handleChange}
                      placeholder="title here"
                      required
                    />
                  </div>
                  <div className="mt-2">
                    <input
                      type="date"
                      name="start"
                      value={newEvent.start}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mt-2">
                    <label
                      htmlFor="allDay"
                      className="inline-flex items-center"
                    >
                      <input
                        type="checkbox"
                        id="allDay"
                        name="allDay"
                        checked={newEvent.allDay}
                        onChange={handleChange}
                      />
                      <span className="ml-2 text-sm text-gray-900">
                        All Day
                      </span>
                    </label>
                  </div>
                  <div className="mt-5">
                    <button
                      type="submit"
                      className="bg-black text-white px-4 py-2 rounded-md hover:bg-black/50 focus:outline-none focus:ring focus:ring-violet-200"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <main className="flex items-center justify-between ">
            <div className="grid grid-cols-10">
              <div className="col-span-8 w-[1000px]">
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                  headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek",
                  }}
                  events={allEvents}
                  nowIndicator={true}
                  editable={true}
                  selectable={true}
                  dateClick={handleDateClick}
                  height={"100vh"}
                  eventContent={eventContent}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="mx-12 mb-10 mt-16">
        <div className="text-1xl sm:text-3xl md:text-4xl md:text-left lg:text-left font-bold lg:w-[650px] uppercase">
          <h1
            className="flex text-1xl sm:text-3xl md:text-4xl md:text-left lg:text-left font-bold lg:w-[650px]  uppercase"
            style={{ lineHeight: "47px" }}
          >
            <TableProperties size={40} className="mr-1" />
            <p>Table of </p>
            <span className="border-2 border-black rounded-full ml-[5px] px-4 text-[#686D76]">
              Events
            </span>
          </h1>
        </div>
        <Table className="bg-[#F1F8E8] w-fit rounded-[20px] mt-6">
          <TableCaption>A list of your recent events.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-fit ">Event</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>All day</TableHead>
              <TableHead className="text-right">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allEvents?.map((eve) => (
              <TableRow key={eve._id}>
                <TableCell className="font-medium ">
                  <div className="bg-[#81A263] rounded-[20px] text-black px-5 text-center">
                    {eve.title}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="bg-[#A7E6FF] rounded-[20px] text-black px-5 text-center">
                    {eve.start.substring(0, 10)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="bg-[#FFEEA9] rounded-[20px] text-black px-5 text-center">
                    {eve.allDay === true ? "True" : "False"}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="px-3 text-center">
                    <Trash
                      size={19}
                      className="ml-1 rounded-full cursor-pointer"
                      onClick={() => handleDelete(eve?._id)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">{allEvents?.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <Toaster richColors />
    </>
  );
}
