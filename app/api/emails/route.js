import connectMdb from "../../../libs/mongoDB";
import Email from "../../../models/Email";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { user_id, email,  message } = await req.json();

    console.log("Received data:", { user_id, email, message });

    if (!user_id || !email || !message) {
      return NextResponse.json({ message: "Message Failed" }, { status: 400 });
    }

    await connectMdb();
    const message_txt = await Email.create({ user_id, email, message });

    console.log("Created note:", message_txt);

    return NextResponse.json({ message: "Email created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json(
      { message: "Email creation failed" },
      { status: 500 }
    );
  }
}
/*
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
*/
