"use server"

import User from "../models/user.model"
import { connectToDatabase } from "../mongoose"

export async function updateUserStreak(userId: string, sterak: number){
    connectToDatabase()
    const userData = await User.findOne({ id: userId })
    await User.findByIdAndUpdate(
        {
            _id: userId
        },
        {
            streak: sterak
        }
    )
}