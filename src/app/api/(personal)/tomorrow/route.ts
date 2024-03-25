import PersonalTomorrow from "@/lib/models/personal.tomorrow.model";
import User from "@/lib/models/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

interface PersonalTomorrowData {
    id: string;
    title: string;
    author: string;
    createdAt: string;
    completed: boolean;
}
export async function GET(){
    console.log("get personal tomorrow fired")
    const user = await currentUser();
    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    connectToDatabase(); // Connect to the database
    try {
      const tomorrows = await PersonalTomorrow.find({ author: user.id })
        .lean() // Convert Mongoose documents to plain JavaScript objects
        .exec();
  
      const formattedData: PersonalTomorrowData[] = tomorrows.map((tomorrow: any) => ({
        id: tomorrow._id.toString(),
        title: tomorrow.title,
        author: tomorrow.author.toString(), // Assuming author is a string or ObjectId
        createdAt: tomorrow.createdAt.toString(), // Convert to desired date format if needed
        completed: !!tomorrow.completed, // Ensure completed is a boolean value
      }));
  
      console.log('Formatted data:', formattedData);
      return new NextResponse(JSON.stringify(formattedData), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
      console.error('Error fetching personal tomorrow data:', error);
      throw error;
    }
}

export async function POST(req: Request ){
    console.log("post personal tomorrow fired")
    const data = await req.json();
    connectToDatabase()

    try {
        const createdTomorrow = await PersonalTomorrow.create({
            title: data.title,
            author: data.author,
            completed: false,
        })

        await User.findOneAndUpdate({author: data.author}, {
            $push: {tomorrow: createdTomorrow._id}
        })
        return new NextResponse(JSON.stringify(createdTomorrow))
    } catch (error: any) {
        throw new Error(`Failed to create tomorrow: ${error.message}`);
    }
}

// security risk
export async function PUT(req: Request) {
    const data = await req.json();
    connectToDatabase();
    try {
        const updatedTomorrow = await PersonalTomorrow.findOneAndUpdate(
            {
                _id: data.id,
                author: data.author,
            },
            {
                title: data.title,
                completed: data.completed
            }
        ).exec()
        return new NextResponse(JSON.stringify(updatedTomorrow))
    } catch (error) {
        console.error("Error updating tomorrow:", error);
        throw error; // Rethrow the error for handling elsewhere
    }
}

export async function DELETE(req: Request){
    const data = await req.json();
    connectToDatabase()
    try {
        await PersonalTomorrow.findOneAndDelete({
            _id: data.tomorrowId,
            author: data.authorId,
        })

        await User.updateOne(
            {
                _id: data.authorId
            },
            {
                $pull: {tomorrow: data.tomorrowId}
            }
        )
        return new NextResponse(JSON.stringify("deleted"))
    } catch (error) {
        
    }
}
