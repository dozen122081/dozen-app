import FbTodo from "@/lib/models/featureboard.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    const data = await req.json()
    console.log("func fired")
    try {
        connectToDatabase();

        const deleteTodos = await FbTodo.deleteMany({
            author: data.author
        });
        const createdTodo = await FbTodo.insertMany(data.newData.map((item: any )=> ({ ...item, author: data.author }))); // Corrected line

        // revalidatePath(path);
        return new NextResponse(JSON.stringify(createdTodo))
    } catch (error: any) {
        throw new Error(`Failed to create thread: ${error.message}`);
    }
}
