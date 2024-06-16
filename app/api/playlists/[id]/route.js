import connectMdb from "../../../../libs/mongoDB";
import Playlist from "../../../../models/Playlist";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = params;
  const {
    newLink: link,
  } = await req.json();
  console.log("Parsed body:", { link});
  await connectMdb();
  await Playlist.findByIdAndUpdate(id, { link });
  return NextResponse.json({ message: "Playlist Updated" }, { status: 200 });
}
export async function GET(req, { params }) {
  const { id } = params;
  await connectMdb();
  const playlist = await Playlist.findOne({ _id: id });
  return NextResponse.json({ playlist }, { status: 200 });
}
