import PersonalTodo from "@/lib/models/personaltodo.model";
import User from "@/lib/models/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    const data = await req.json()
    console.log("func fired")
    try {
        connectToDatabase();

        const deleteTodos = await PersonalTodo.deleteMany({
            author: data.author
        });
        const createdTodo = await PersonalTodo.insertMany(data.newData.map((item: any )=> ({ ...item, author: data.author }))); // Corrected line
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
