import PersonalStickyNotes from "@/lib/models/personal.stickynotes.model";
import User from "@/lib/models/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
    const user = await currentUser();
    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    connectToDatabase();

    try {
        const stickyNotes = await PersonalStickyNotes.find({ author: user.id })
        .sort({ createdAt: "desc" })
        .exec();
        const stickyNoteData = stickyNotes.map(stickynote => ({
            id: stickynote._id.toString(),
            author: stickynote.author.toString(),
            title: stickynote.title,
            description: stickynote.description,
            backgroundColor: stickynote.backgroundColor
        }));
        console.log("get req")
        console.log(stickyNotes)
        console.log(stickyNoteData)
        // return stickyNoteData;
        return new NextResponse(JSON.stringify(stickyNoteData), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error("Error fetching sticky notes:", error);
        throw error; // Rethrow the error for handling elsewhere
    }
}

export async function POST(req: Request) {
    const data = await req.json()
    console.log("func fired")
    console.log("cre")
    try {
        connectToDatabase();
        const createdTodo = await PersonalStickyNotes.create({
            title: data.title,
            description: data.description,
            author: data.author,
            backgroundColor: data.background,
        });
        console.log(createdTodo);
        // Update User model
        await User.findOneAndUpdate({
            author: data.author
        }, {
            $push: { notes: createdTodo._id },
        });

        revalidatePath(data.path);
        return new NextResponse(JSON.stringify(createdTodo))
    } catch (error: any) {
        throw new Error(`Failed to create sticky note: ${error.message}`);
    }
}

export async function DELETE(req: Request) {
    const data = await req.json()
    try {
    connectToDatabase();
  
      // Find the thread to be deleted (the main thread)
      const threadIdToRemove = await PersonalStickyNotes.findByIdAndDelete({_id: data.id});
  
      // Update User model
      await User.updateOne(
        { id: data.author },
        { $pull: { notes: data.id } }
      );
      revalidatePath(data.path);
      return new NextResponse(JSON.stringify(threadIdToRemove))
    } catch (error: any) {
      throw new Error(`Failed to delete notes: ${error.message}`);
    }
}