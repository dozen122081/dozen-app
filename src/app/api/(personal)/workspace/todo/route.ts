import WorkspaceTodo from "@/lib/models/personalWorkspace/workspace.todo";
import User from "@/lib/models/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    console.log("function fired")
    const queryParams = new URLSearchParams(req.url.split('?')[1]); // Extract query parameters
    const workspaceId = queryParams.get('workspaceId'); // Get the value of the 'id' parameter

    console.log(workspaceId); // Output: '660a9e4e957c1bfe2aff19a6'

    const user = await currentUser();
    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    connectToDatabase(); // Connect to the database
    const todos = await WorkspaceTodo.find({ author: user.id, workspaceId: workspaceId }).lean().exec();

    const todoData = todos.map(todo => ({
      id: todo._id.toString(),
      workspaceId: todo.workspaceId,
      author: todo.author.toString(),
      title: todo.title,
      description: todo.description,
      category: todo.category || "backlog" // Fallback to "backlog" if category is not provided
    }));

    return new NextResponse(JSON.stringify(todoData), { headers: { 'Content-Type': 'application/json' } });

}

export async function POST(req: Request) {
    const data = await req.json()
    try {
        connectToDatabase();
        const createdTodo = await WorkspaceTodo.create({
            workspaceId: data.workspaceId,
            title: data.title,
            description: data.description,
            author: data.author,
            category: data.category
        });
        // Update User model
        await User.findOneAndUpdate({ author: data.author }, {
            $push: { todos: createdTodo._id },
        });

        return new NextResponse(JSON.stringify(createdTodo))
    } catch (error: any) {
        throw new Error(`Failed to create thread: ${error.message}`);
    }
}
export async function PUT(req: Request) {
    const data = await req.json();
    connectToDatabase();
    console.log("todo put func fired")
    console.log(data)
    try {
        const createdTodo = await WorkspaceTodo.findByIdAndUpdate(
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
        throw new Error(`Failed to create thread: ${error.message}`);
    }
}

export async function DELETE(req: Request){
    connectToDatabase();
    const data = await req.json()
    try {

        // Find the thread to be deleted (the main thread)
        const threadIdToRemove = await WorkspaceTodo.findByIdAndDelete({ _id: data.id });

        // Update User model
        await User.updateOne(
            { id: data.author },
            { $pull: { todos: data.id } }
        );
        return new NextResponse(JSON.stringify(threadIdToRemove))
    } catch (error: any) {
        throw new Error(`Failed to delete thread: ${error.message}`);
    }
}