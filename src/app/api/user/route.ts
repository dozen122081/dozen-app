import User from "@/lib/models/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export type UserData = {
    tomorrow: string[]; // Assuming tomorrow is an array of any type
    _id: string; // Assuming _id is a string
    id: string;
    __v?: number;
    image: string;
    isVerified: boolean;
    name: string;
    notes: string[]; // Assuming notes is an array of strings (IDs)
    onboarded: boolean;
    organizations: any[]; // You can replace 'any' with a specific type if needed
    todos: string[]; // Assuming todos is an array of strings (IDs)
    username: string;
    streak: number,
  }


  export async function GET() {
    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
  
    try {
      connectToDatabase(); // Connect to the database
  
      const userData = await User.findOne({ id: user.id });
  
      if (!userData) {
        return new NextResponse("User not found", { status: 404 });
      }
  
      return new NextResponse(JSON.stringify(userData), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
      console.error("Error fetching user data:", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }


export async function PUT(req: Request){
    connectToDatabase()
    const data = await req.json()
    try{
        await User.findOneAndUpdate(
            { id: data.userId },
            {
                id: data.userId,
                username: data.username.toLocaleLowerCase(),
                name: data.ame,
                image: data.image,
                onboarded: data.onboarded,
                streak: 0,
            },
            {
                upsert: true,
            }
        );
        if(data.path === "/profile/edit"){
            revalidatePath(data.path)
        }
        return new NextResponse(JSON.stringify("200 created"))
    } catch (error) {
        console.error("Got and error:")
        console.error(error)
    }

}