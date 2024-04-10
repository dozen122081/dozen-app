import WorkspaceDayTask from "@/lib/models/personalWorkspace/workspace.daytask.model";
import User from "@/lib/models/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    const data = await req.json()
    console.log("ws cat func fired")
    try {
        connectToDatabase();

        const deleteTomorrow = await WorkspaceDayTask.deleteMany({
            author: data.author,
            workspaceId: data.workspaceId,
            taskFor: "tomorrow",
        });
        const updatedTodos = await WorkspaceDayTask.insertMany(data.newData.map((item: any )=> ({ ...item, author: data.author, workspaceId: data.workspaceId }))); // Corrected line
        // Update User model
        // we need to fix it.
        await User.findOneAndUpdate({author: data.author}, {
            $pull: { workspacetasks: data.oldData.map((todo: any) => todo.id) },
            $push: { workspacetasks: updatedTodos.map(todo => todo._id) },
        });

        // revalidatePath(path);
        return new NextResponse(JSON.stringify(updatedTodos))
    } catch (error: any) {
        throw new Error(`Failed to create thread: ${error.message}`);
    }
}
