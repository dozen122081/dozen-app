import PersonalStickyNotes from "@/lib/models/personal.stickynotes.model";
import PersonalWorkspace from "@/lib/models/personal.workspace.model";
import WorkspaceStickyNotes from "@/lib/models/personalWorkspace/workspace.stickynote";
import WorkspaceTodo from "@/lib/models/personalWorkspace/workspace.todo";
import User from "@/lib/models/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET() {
    const user = await currentUser();
    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    connectToDatabase();

    try {
        const workspaces = await PersonalWorkspace.find({ author: user.id })
        .sort({ createdAt: "desc" })
        .exec();
        const workspaceData = workspaces.map(workspace => ({
            id: workspace._id.toString(),
            author: workspace.author.toString(),
            title: workspace.title,
            description: workspace.description,
            backgroundColor: workspace.backgroundColor
        }));
        // return stickyNoteData;
        return new NextResponse(JSON.stringify(workspaceData), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error("Error fetching sticky notes:", error);
        throw error; // Rethrow the error for handling elsewhere
    }
}

export async function POST(req: Request) {
    const data = await req.json()
    console.log("func ws post fired")
    try {
        connectToDatabase();
        const createdWorkspace = await PersonalWorkspace.create({
            title: data.title,
            description: data.description,
            author: data.author,
            backgroundColor: data.background,
        });
        
        // Update User model
        await User.findOneAndUpdate({
            id: data.author
        }, {
            $push: { workspaces: createdWorkspace._id },
        });
        return new NextResponse(JSON.stringify(createdWorkspace))
    } catch (error: any) {
        throw new Error(`Failed to create sticky note: ${error.message}`);
    }
}

export async function DELETE(req: Request) {
    // fix delete logic as even it's deleted it still remains in db
    const data = await req.json()
    try {
    connectToDatabase();
  
      // Find the thread to be deleted (the main thread)
      const workspaceIdToRemove = await PersonalWorkspace.findByIdAndDelete({_id: data.id});
      // Update User model
      const deleteWorkspaceTodos = await WorkspaceTodo.deleteMany({
        workspaceId: data.id,
      })
      const deleteWorkspaceStickyNotes = await WorkspaceStickyNotes.deleteMany({
        workspaceId: data.id,
      })
      await User.findOneAndUpdate(
        { id: data.author },
        { $pull: { workspaces: data.id } }
      );
      return new NextResponse(JSON.stringify(workspaceIdToRemove))
    } catch (error: any) {
      throw new Error(`Failed to delete notes: ${error.message}`);
    }
}