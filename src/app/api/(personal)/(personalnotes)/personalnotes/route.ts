import { PersonalNotes } from "@/lib/models/personal.notes.model";
import { connectToDatabase } from "@/lib/mongoose";
import { currentUser } from "@clerk/nextjs";

import { NextResponse } from "next/server";
export async function GET(){
    const user = await currentUser();
    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    connectToDatabase()
    try {
      const notes = await PersonalNotes.find({ author: user.id })
      const NoteData = notes.map(note => ({
        id: note._id.toString(),
        author: note.author.toString(),
        title: note.title,
        content: note.content,
      }));
        return new NextResponse(JSON.stringify(NoteData))
    } catch (error: any) {
        console.error(error.message)    
    }
}

