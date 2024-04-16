import PersonalWorkspace from "@/lib/models/personal.workspace.model";
import WorkspaceDayTask from "@/lib/models/personalWorkspace/workspace.daytask.model";
import WorkspaceProgress from "@/lib/models/personalWorkspace/workspace.progress.model";
import User from "@/lib/models/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

interface WorkspaceProgressData {
    id: string;
    author: string;
    createdAt: string;
    trackedDate: boolean;
    totalCompletedTasks: number;
    workspaceId: string;
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
  
      const formattedData: WorkspaceProgressData[] = tomorrows.map((tomorrow: any) => ({
        id: tomorrow._id.toString(),
        author: tomorrow.author.toString(), // Assuming author is a string or ObjectId
        createdAt: tomorrow.createdAt.toString(), // Convert to desired date format if needed
        trackedDate: tomorrow.trackedDate, // Convert to desired date format if needed
        totalCompletedTasks: tomorrow.totalCompletedTasks, // Convert to desired date format if needed
        workspaceId: tomorrow.workspaceId, 
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
        const condition = ""
        if(condition){
            const createdTomorrow = await WorkspaceProgress.create({
                author: data.author,
                workspaceId: data.workspaceId,
                trackedDate: data.trackedDate,
            })
    
            await PersonalWorkspace.findOneAndUpdate({author: data.author}, {
                $push: {workspaceprogressdata: createdTomorrow._id}
            })
        } else {
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
        }
        return new NextResponse(JSON.stringify("updatedTomorrow"))
        
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
