import FbTodo from "@/lib/models/featureboard.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    connectToDatabase(); // Connect to the database
    const todos = await FbTodo.find().lean().exec();

    const todoData = todos.map(todo => ({
      id: todo._id.toString(),
      author: todo.author.toString(),
      authorEmail: todo.authorEmail,
      authorImage: todo.authorImage,
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
        const createdTodo = await FbTodo.create({
            title: data.title,
            description: data.description,
            author: data.author,
            authorEmail: data.authorEmail,
            authorImage: data.authorImage,
            category: data.category
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
        const createdTodo = await FbTodo.findByIdAndUpdate(
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
        const threadIdToRemove = await FbTodo.findByIdAndDelete({ _id: data.id });

        return new NextResponse(JSON.stringify(threadIdToRemove))
    } catch (error: any) {
        throw new Error(`Failed to delete thread: ${error.message}`);
    }
}