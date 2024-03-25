import PersonalTodo from "@/lib/models/personaltodo.model";
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


    connectToDatabase(); // Connect to the database


    const todos = await PersonalTodo.find({ author: user.id }).lean().exec();

    const todoData = todos.map(todo => ({
      id: todo._id.toString(),
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
        const createdTodo = await PersonalTodo.create({
            title: data.title,
            description: data.description,
            author: data.author,
            category: data.category
        });
        console.log(createdTodo);
        // Update User model
        await User.findOneAndUpdate({ author: data.author }, {
            $push: { todos: createdTodo._id },
        });

        revalidatePath(data.path);
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
        const todo = await PersonalTodo.findById({_id: data.id})
        console.log('------------')
        console.log('found todo')
        console.log(todo)
        console.log("------------")
        const createdTodo = await PersonalTodo.findByIdAndUpdate(
            {
                _id: data.id
            },
            {
                title: data.title,
                description: data.description,
            }
        ).exec();
        console.log(createdTodo);
        console.log("=====")

        revalidatePath(data.path);
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
        const threadIdToRemove = await PersonalTodo.findByIdAndDelete({ _id: data.id });

        // Update User model
        await User.updateOne(
            { id: data.author },
            { $pull: { todos: data.id } }
        );
        revalidatePath(data.path);
        return new NextResponse(JSON.stringify(threadIdToRemove))
    } catch (error: any) {
        throw new Error(`Failed to delete thread: ${error.message}`);
    }
}