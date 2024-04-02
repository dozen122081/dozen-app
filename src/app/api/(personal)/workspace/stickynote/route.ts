import PersonalStickyNotes from "@/lib/models/personal.stickynotes.model";
import WorkspaceStickyNotes from "@/lib/models/personalWorkspace/workspace.stickynote";
import User from "@/lib/models/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const queryParams = new URLSearchParams(req.url.split('?')[1]); // Extract query parameters
    const workspaceId = queryParams.get('workspaceId'); // Get the value of the 'id' parameter
    const user = await currentUser();
    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    connectToDatabase();

    try {
        const stickyNotes = await WorkspaceStickyNotes.find({ author: user.id, workspaceId: workspaceId })
        .sort({ createdAt: "desc" })
        .exec();
        const stickyNoteData = stickyNotes.map(stickynote => ({
            id: stickynote._id.toString(),
            workspaceId: stickynote.workspaceId,
            author: stickynote.author.toString(),
            title: stickynote.title,
            description: stickynote.description,
            backgroundColor: stickynote.backgroundColor
        }));
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
    try {
        connectToDatabase();
        const createdTodo = await WorkspaceStickyNotes.create({
            workspaceId: data.workspaceId,
            title: data.title,
            description: data.description,
            author: data.author,
            backgroundColor: data.background,
        });
        // Update User model
        await User.findOneAndUpdate({
            author: data.author
        }, {
            $push: { notes: createdTodo._id },
        });

        return new NextResponse(JSON.stringify(createdTodo))
    } catch (error: any) {
        throw new Error(`Failed to create sticky note: ${error.message}`);
    }
}
export async function PUT(req: Request) {
    const data = await req.json()
    console.log("func fired")
    try {
        const createdTodo = await WorkspaceStickyNotes.findByIdAndUpdate(
            {
                _id: data.id
            },
            {
                title: data.title,
                description: data.description,
            }
        ).exec();
        return new NextResponse(JSON.stringify(createdTodo))
    } catch (error: any) {
        throw new Error(`Failed to update sticky note: ${error.message}`);
    }
}

export async function DELETE(req: Request) {
    const data = await req.json()
    try {
    connectToDatabase();
  
      // Find the thread to be deleted (the main thread)
      const threadIdToRemove = await WorkspaceStickyNotes.findByIdAndDelete({_id: data.id});
  
      // Update User model
      await User.updateOne(
        { id: data.author },
        { $pull: { notes: data.id } }
      );
      return new NextResponse(JSON.stringify(threadIdToRemove))
    } catch (error: any) {
      throw new Error(`Failed to delete notes: ${error.message}`);
    }
}