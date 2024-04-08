import WorkspaceDayTask from "@/lib/models/personalWorkspace/workspace.daytask.model"
import { connectToDatabase } from "@/lib/mongoose"
import { NextResponse } from "next/server"

export async function DELETE(req: Request){
    const data = await req.json()
    connectToDatabase()
    try{
        if(data.completed){
            await WorkspaceDayTask.deleteMany(
                {
                    author: data.authorId,
                    completed: true,
                    taskFor: "tomorrow"
                }
            )
            return new NextResponse(JSON.stringify("deleted completed"))
        }else {
            await WorkspaceDayTask.deleteMany(
                {
                    author: data.authorId,
                    completed: false,
                    taskFor: "tomorrow"
                }
            )
            return new NextResponse(JSON.stringify("deleted incomplete"))
        }
    } catch (err){
        throw new Error("delete tomorrows error")
    }
}