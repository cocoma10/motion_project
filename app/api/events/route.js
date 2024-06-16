import connectMdb from "../../../libs/mongoDB";
import Event from "../../../models/Event"; // <--- Change this line
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
      const { user_id, title, start, allDay } = await req.json();
  
      console.log("Received data:", {user_id, title, start, allDay });
  
      if (!user_id || !title || !start) {
        return NextResponse.json({ message: "Title and start date are required" }, { status: 400 });
      }
  
      await connectMdb();
      const newEvent = await Event.create({ user_id, title, start, allDay });
  
      console.log("Created event:", newEvent);
  
      return NextResponse.json(newEvent, { status: 201 });
    } catch (error) {
      console.error("Error creating event:", error);
      return NextResponse.json({ message: "Event creation failed" }, { status: 500 });
    }
  }
export async function GET() {
  await connectMdb();
  const events = await Event.find();
  return NextResponse.json({ events });
}

export async function DELETE(req) {
    // get id from url
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ message: "Event ID not provided" }, { status: 400 });
    }
    
    await connectMdb();
    await Event.findByIdAndDelete(id);
    return NextResponse.json({ message: "Event deleted" }, { status: 200 });
  }