import WorkspaceTodo from "@/lib/models/personalWorkspace/workspace.todo";
import User from "@/lib/models/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    const data = await req.json()
    console.log("ws cat func fired")
    try {
        connectToDatabase();

        const deleteTodos = await WorkspaceTodo.deleteMany({
            author: data.author,
            workspaceId: data.workspaceId
        });
        const createdTodo = await WorkspaceTodo.insertMany(data.newData.map((item: any )=> ({ ...item, author: data.author, workspaceId: data.workspaceId }))); // Corrected line
        // Update User model
        await User.findOneAndUpdate({author: data.author}, {
            $push: { todos: createdTodo.map(todo => todo._id) },
        });

        // revalidatePath(path);
        return new NextResponse(JSON.stringify(createdTodo))
    } catch (error: any) {
        throw new Error(`Failed to create thread: ${error.message}`);
    }
}
