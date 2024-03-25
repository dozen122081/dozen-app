import PersonalTomorrow from "@/lib/models/personal.tomorrow.model"
import { connectToDatabase } from "@/lib/mongoose"
import { NextResponse } from "next/server"

export async function DELETE(req: Request){
    const data = await req.json()
    connectToDatabase()
    try{
        if(data.completed){
            await PersonalTomorrow.deleteMany(
                {
                    author: data.authorId,
                    completed: true
                }
            )
            return new NextResponse(JSON.stringify("deleted completed"))
        }else {
            await PersonalTomorrow.deleteMany(
                {
                    author: data.authorId,
                    completed: false
                }
            )
            return new NextResponse(JSON.stringify("deleted incomplete"))
        }
    } catch (err){
        throw new Error("delete tomorrows error")
    }
}