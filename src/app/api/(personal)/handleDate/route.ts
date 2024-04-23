import { DateData } from "@/lib/models/personal.date.model";
import { connectToDatabase } from "@/lib/mongoose";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    const body = await req.json();
    const user = await currentUser();
    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    connectToDatabase()
    console.log("POst api fired, with userId: ")
    console.log(user.id)
    try{
        const newDate = await DateData.create({
            date: body.targetDate,
            author: user.id
        });
        console.log(newDate);
        return new NextResponse("success 200")
    } catch(error){
        console.error("Failed to save form data:", error);
        return new NextResponse("Error ")
    }
}

export async function GET() {
    const user = await currentUser();
    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    connectToDatabase()
    try {
        const date = await DateData.find({author: user.id});
        // console.log(data)
        return new NextResponse(JSON.stringify(date))
    } catch (error) {
        console.error("Error fetching data:", error);   
        return new NextResponse("Error fetching data!")
    }
}

export async function DELETE(req: Request) {
    const data = await req.json();
    connectToDatabase()
    try {
        if (!data.id) {
            throw new Error("No id provided in the request");
        }
        
        const result = await DateData.findOneAndDelete({ _id: data.id });
        return new NextResponse(JSON.stringify(result));
    } catch (error) {
        console.error("Error deleting data:", error);
        return new Response("Failed to delete data", { status: 500 });
    }
}
