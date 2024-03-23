"use server"

import PersonalTomorrow from "../models/personal.tomorrow.model"
import User from "../models/user.model"
import { connectToDatabase } from "../mongoose"


interface fetchPersonalTomorrowProps{
    author: string;
}
interface PersonalTomorrowData {
    id: string;
    title: string;
    author: string;
    createdAt: string;
    completed: boolean;
  }
  export async function fetchPersonalTomorrow({ author }:fetchPersonalTomorrowProps): Promise<PersonalTomorrowData[]> {
    try {
      const tomorrows = await PersonalTomorrow.find({ author })
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
      return formattedData;
    } catch (error) {
      console.error('Error fetching personal tomorrow data:', error);
      throw error;
    }
  }
interface createPersonalTomorrowProps{
    title: string;
    author: string;
}

export async function createPersonalTomorrow({
    title,
    author,
}: createPersonalTomorrowProps ){
    connectToDatabase()

    try {
        const createdTomorrow = await PersonalTomorrow.create({
            title,
            author,
            completed: false,
        })

        await User.findByIdAndUpdate(author, {
            $push: {tomorrow: createdTomorrow._id}
        })
    } catch (error: any) {
        throw new Error(`Failed to create thread: ${error.message}`);
    }
}

interface updatePersonalTomorrowProps{
    id: string,
    title: string,
    author: string,
    completed: boolean,
}
export async function updatePersonalTomorrow({
    id,
    title,
    author,
    completed
}: updatePersonalTomorrowProps) {
    connectToDatabase();
    console.log({
        id,
        title,
        author,
        completed,
    })
    try {
        await PersonalTomorrow.findByIdAndUpdate(
            {
                _id: id,
                author: author,
            },
            {
                title,
                completed
            }
        ).exec()
    } catch (error) {
        console.error("Error updating tomorrow:", error);
        throw error; // Rethrow the error for handling elsewhere
    }
}

interface deletePersonalTomorrowProps{
    tomorrowId: string,
    authorId: string,
}
export async function deletePersonalTomorrow({
    tomorrowId,
    authorId
}: deletePersonalTomorrowProps){
    connectToDatabase()
    try {
        await PersonalTomorrow.findOneAndDelete({
            _id: tomorrowId,
            author: authorId,
        })

        await User.updateOne(
            {
                _id: authorId
            },
            {
                $pull: {tomorrow: tomorrowId}
            }
        )
    } catch (error) {
        
    }
}

interface deleteAllPersonalTomorrow{
    authorId: string;
    completed: boolean;
}

export async function deleteAllPersonalTomorrow({
    authorId,
    completed
}: deleteAllPersonalTomorrow){
    connectToDatabase()
    try{
        if(completed){
            await PersonalTomorrow.deleteMany(
                {
                    author: authorId,
                    completed: true
                }
            )
        }else {
            await PersonalTomorrow.deleteMany(
                {
                    author: authorId,
                    completed: false
                }
            )
        }
    } catch (err){

    }
}