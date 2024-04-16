import WorkspaceDayTask from "@/lib/models/personalWorkspace/workspace.daytask.model";
import User from "@/lib/models/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

interface WorkspaceTomorrowData {
    id: string;
    title: string;
    author: string;
    createdAt: string;
    completed: boolean;
    workspaceId: string;
    taskFor: "today" | "tomorrow"
}
export async function GET(req: Request){
    console.log("get workspace tomorrow fired")
    const queryParams = new URLSearchParams(req.url.split('?')[1]); // Extract query parameters
    const workspaceId = queryParams.get('workspaceId'); // Get the value of the 'id' parameter

    console.log(workspaceId); // Output: '660a9e4e957c1bfe2aff19a6'

    const user = await currentUser();
    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    connectToDatabase(); // Connect to the database
    try {
      const tomorrows = await WorkspaceDayTask.find({ author: user.id, taskFor: "today", workspaceId: workspaceId })
        .lean() // Convert Mongoose documents to plain JavaScript objects
        .exec();
  
      const formattedData: WorkspaceTomorrowData[] = tomorrows.map((tomorrow: any) => ({
        id: tomorrow._id.toString(),
        title: tomorrow.title,
        author: tomorrow.author.toString(), // Assuming author is a string or ObjectId
        createdAt: tomorrow.createdAt.toString(), // Convert to desired date format if needed
        taskFor: tomorrow.taskFor,
        workspaceId: tomorrow.workspaceId, 
        completed: !!tomorrow.completed, // Ensure completed is a boolean value
      }));
  
      return new NextResponse(JSON.stringify(formattedData), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
      console.error('Error fetching personal tomorrow data:', error);
      throw error;
    }
}

export async function POST(req: Request ){
    console.log("post workspace tomorrow fired")
    const data = await req.json();
    connectToDatabase()

    try {
        const createdTomorrow = await WorkspaceDayTask.create({
            title: data.title,
            author: data.author,
            taskFor: "today",
            workspaceId: data.workspaceId,
            completed: false,
        })

        await User.findOneAndUpdate({author: data.author}, {
            $push: {workspacetasks: createdTomorrow._id}
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
        const updatedTomorrow = await WorkspaceDayTask.findOneAndUpdate(
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
        await WorkspaceDayTask.findOneAndDelete({
            _id: data.tomorrowId,
            author: data.authorId,
        })

        await User.updateOne(
            {
                _id: data.authorId
            },
            {
                $pull: {workspacetasks: data.tomorrowId}
            }
        )
        return new NextResponse(JSON.stringify("deleted"))
    } catch (error) {
        
    }
}
