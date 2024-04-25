import { PersonalNotes } from "@/lib/models/personal.notes.model";
import { connectToDatabase } from "@/lib/mongoose";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function GET(req: Request){
    const queryParams = new URLSearchParams(req.url.split('?')[1]); // Extract query parameters
    const noteId = queryParams.get('noteId');

    const user = await currentUser();
    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    connectToDatabase()
    try {
        const notesData = await PersonalNotes.findById({ _id: noteId, author: user.id})
        return new NextResponse(JSON.stringify(notesData))
    } catch (error: any) {
        console.error(error.message)    
    }
}

export async function POST(req: Request) {
  const body = await req.json();
  const user = await currentUser();
  if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    await PersonalNotes.create({
        title: body.title,
        author: body.author,
        content: JSON.stringify(body.content)
    });
    return new NextResponse(JSON.stringify("created"));
  } catch (error: any) {
    console.error(error.message);
  }
}
export async function PUT(req: Request) {
  const body = await req.json();
  const user = await currentUser();
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    await PersonalNotes.updateOne(
        {
            _id: body.noteId,
            author: body.author,
        },
        {
            content: JSON.stringify(body.content),
        }
    );
    return new NextResponse(JSON.stringify("updated"));
  } catch (error: any) {
    console.error(error.message);
  }
}
export async function DELETE(req: Request) {
  const body = await req.json();
  const user = await currentUser();
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    await PersonalNotes.deleteOne(
        {
            _id: body.noteId,
            author: body.author,
        },
    );
    return new NextResponse(JSON.stringify("deleted"));
  } catch (error: any) {
    console.error(error.message);
  }
}
