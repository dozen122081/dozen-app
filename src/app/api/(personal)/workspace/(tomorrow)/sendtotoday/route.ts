import WorkspaceDayTask from "@/lib/models/personalWorkspace/workspace.daytask.model";
import { connectToDatabase } from "@/lib/mongoose";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";


// security risk
export async function PUT(req: Request) {
    const data = await req.json();
    const user = await currentUser();
    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    connectToDatabase();
    try {
        if(data.taskId){
            const updatedTomorrow = await WorkspaceDayTask.updateMany(
                {
                    _id: data.taskId,
                    author: data.author,
                    workspaceId: data.workspaceId,
                },
                {
                    taskFor: "today"
                }
                ).exec()
            return new NextResponse(JSON.stringify(updatedTomorrow))
        } else {
            const updatedTomorrow = await WorkspaceDayTask.updateMany(
                {
                    author: data.author,
                    workspaceId: data.workspaceId
                },
                {
                    taskFor: "today"
                }
                ).exec()
            return new NextResponse(JSON.stringify(updatedTomorrow))
        }
    } catch (error) {
        console.error("Error updating tomorrow:", error);
        throw error; // Rethrow the error for handling elsewhere
    }
}
