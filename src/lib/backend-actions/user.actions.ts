"use server"

import { revalidatePath } from "next/cache";
import User from "../models/user.model"
import { connectToDatabase } from "../mongoose";
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
  
export async function fetchUserData(userId: string){
    try {
        connectToDatabase(); // Connect to the database

        const userData = await User.findOne({ id: userId });

        // const fullUserData: UserData = {
        //     tomorrow: userData?.tomorrow,
        //     _id: userData._id.toString(),
        //     id: userData?.id.toString(),
        //     image: userData.image,
        //     isVerified: userData?.isVerified,
        //     name: userData.name,
        //     notes: userData?.notes,
        //     onboarded: userData?.onboarded,
        //     organizations: userData?.organizations,
        //     todos: userData?.todos,
        //     username: userData?.username,
        //     streak: userData?.streak,
        // };

        // // NOTE: if you are facing problem with user data then just return "userData"
        // console.log(fullUserData);
        
        return userData;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error; // Rethrow the error for handling elsewhere
    }
}

interface createUpdateUserDataProps{
    userId: string;
    name: string;
    username: string;
    image: string;
    onboarded: boolean;
    path: string;
}
export async function createUpdateUserData({
    userId,
    name,
    username,
    image,
    onboarded,
    path
}: createUpdateUserDataProps){
    try{
        connectToDatabase()
        await User.findOneAndUpdate(
            { id: userId },
            {
                id: userId,
                username: username.toLocaleLowerCase(),
                name: name,
                image: image,
                onboarded: onboarded,
                streak: 0,
            },
            {
                upsert: true,
            }
        );
        if(path === "/profile/edit"){
            revalidatePath(path)
        }
    } catch (error) {
        console.error("Got and error:")
        console.error(error)
    }

}