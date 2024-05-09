// import { currentUser } from "@clerk/nextjs";
import { WorkspaceNotes } from "@/lib/models/personalWorkspace/workspace.notes.model";
import User from "@/lib/models/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const queryParams = new URLSearchParams(req.url.split('?')[1]); // Extract query parameters
    const workspaceId = queryParams.get('workspaceId'); // Get the value of the 'id' parameter
    const user = {
        id: 1245,
    };
    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    connectToDatabase();

    try {
        const noteData = await WorkspaceNotes.find({ author: user.id, workspaceId: workspaceId })
        .sort({ createdAt: "desc" })
        .exec();
        const wsNoteData = noteData.map(data => ({
            id: data._id.toString(),
            title: data.title, 
            workspaceId: data.workspaceId,
            author: data.author.toString(),
        }));
        // return stickyNoteData;
        return new NextResponse(JSON.stringify(noteData), { headers: { 'Content-Type': 'application/json' } });
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
        const createdTodo = await WorkspaceNotes.create({
            workspaceId: data.workspaceId,
            date: data.date,
            author: data.author,
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
        const createdTodo = await WorkspaceNotes.findByIdAndUpdate(
            {
                _id: data.id
            },
            {
                date: data.date,
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
      const deletedWorkspaceDate = await WorkspaceNotes.findByIdAndDelete({
        _id: data.id
      });
  
      // Update User model
      await User.updateOne(
        { id: data.author },
        { $pull: { notes: data.id } }
      );
      return new NextResponse(JSON.stringify(deletedWorkspaceDate))
    } catch (error: any) {
      throw new Error(`Failed to delete notes: ${error.message}`);
    }
}