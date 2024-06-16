import connectMdb from "../../../libs/mongoDB";
import Playlist from "../../../models/Playlist";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { user_id, link} = await req.json();

    console.log("Received data:", { user_id, link });

    if (!user_id || !link ) {
      return NextResponse.json({ message: "Playlist Failed" }, { status: 400 });
    }

    await connectMdb();
    const playlist = await Playlist.create({ user_id, link });

    console.log("Created link:", playlist);

    return NextResponse.json({ message: "Playlist created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating Playlist:", error);
    return NextResponse.json(
      { message: "Playlist creation failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectMdb();
  const playlists = await Playlist.find();
  return NextResponse.json({ playlists });
}

