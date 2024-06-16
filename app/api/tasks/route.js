import connectMdb from "../../../libs/mongoDB";
import Task from "../../../models/Task";
import { NextResponse } from 'next/server'

export async function POST(req){
    const {user_id,task} = await req.json();
    await connectMdb();
    await Task.create({user_id,task});
    return NextResponse.json(
        {message:"Task created"},
        {status:201}
    );
};

export async function GET() {
    await connectMdb();
    const tasks = await Task.find();
    return NextResponse.json({tasks});
}

export async function DELETE(req) {
    // get id from url
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ message: "Task ID not provided" }, { status: 400 });
    }
    
    await connectMdb();
    await Task.findByIdAndDelete(id);
    return NextResponse.json({ message: "Task deleted" }, { status: 200 });
  }