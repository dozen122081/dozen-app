"use server"

import { revalidatePath } from "next/cache";
import PersonalStickyNotes from "../models/personal.stickynotes.model";
import User from "../models/user.model";
import { connectToDatabase } from "../mongoose";

export async function fetchPersonalStickyNotes(userId: string) {
    connectToDatabase();

    try {
        const stickyNotes = await PersonalStickyNotes.find({ author: userId })
        .sort({ createdAt: "desc" })
        .exec();
        const stickyNoteData = stickyNotes.map(stickynote => ({
            id: stickynote._id.toString(),
            author: stickynote.author.toString(),
            title: stickynote.title,
            description: stickynote.description,
            backgroundColor: stickynote.backgroundColor
        }));
        
        return stickyNoteData;
    } catch (error) {
        console.error("Error fetching sticky notes:", error);
        throw error; // Rethrow the error for handling elsewhere
    }
}

interface Params {
    title: string,
    description: string,
    author: string,
    path: string,
    background: string,
}

export async function createPersonalStickyNotes({
    title,
    description,
    author,
    path,
    background
}: Params) {
    console.log("func fired")
    console.log({
        title,
        description,
        author,
        path,
        background
    })
    try {
        connectToDatabase();
        const createdTodo = await PersonalStickyNotes.create({
            title,
            description,
            author,
            backgroundColor: background,
        });
        console.log(createdTodo);
        // Update User model
        await User.findByIdAndUpdate(author, {
            $push: { notes: createdTodo._id },
        });

        revalidatePath(path);
    } catch (error: any) {
        throw new Error(`Failed to create thread: ${error.message}`);
    }
}

interface deleteStickyNotesProps{
    id: string,
    path: string,
    author: string,
}
export async function deleteStickyNotes({
    id,
    path,
    author,
}: deleteStickyNotesProps) {
    try {
    connectToDatabase();
  
      // Find the thread to be deleted (the main thread)
      const threadIdToRemove = await PersonalStickyNotes.findByIdAndDelete({_id: id});
  
      // Update User model
      await User.updateOne(
        { _id: author },
        { $pull: { notes: id } }
      );
      revalidatePath(path);
    } catch (error: any) {
      throw new Error(`Failed to delete notes: ${error.message}`);
    }
}