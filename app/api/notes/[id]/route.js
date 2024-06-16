import connectMdb from "../../../../libs/mongoDB";
import Note from "../../../../models/Note";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = params;
  const {
    newTitle: title,
    newColor: NoteColor,
    newDescription: description,
  } = await req.json();
  console.log("Parsed body:", { title, NoteColor, description });
  await connectMdb();
  await Note.findByIdAndUpdate(id, { title, NoteColor, description });
  return NextResponse.json({ message: "Note Updated" }, { status: 200 });
}
export async function GET(req, { params }) {
  const { id } = params;
  await connectMdb();
  const note = await Note.findOne({ _id: id });
  return NextResponse.json({ note }, { status: 200 });
}
