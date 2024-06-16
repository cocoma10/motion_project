import connectMdb from "../../../libs/mongoDB";
import Note from "../../../models/Note";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { user_id, title,  NoteColor,description } = await req.json();

    console.log("Received data:", { user_id, title, NoteColor, description });

    if (!user_id || !title || !NoteColor || !description) {
      return NextResponse.json({ message: "Note Failed" }, { status: 400 });
    }

    await connectMdb();
    const note = await Note.create({ user_id, title, NoteColor, description });

    console.log("Created note:", note);

    return NextResponse.json({ message: "Note created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating note:", error);
    return NextResponse.json(
      { message: "Note creation failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectMdb();
  const notes = await Note.find();
  return NextResponse.json({ notes });
}


export async function DELETE(req) {
  // get id from url
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ message: "Note ID not provided" }, { status: 400 });
  }
  
  await connectMdb();
  await Note.findByIdAndDelete(id);
  return NextResponse.json({ message: "Note deleted" }, { status: 200 });
}

