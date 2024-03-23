"use server"

import { revalidatePath } from "next/cache";
import PersonalTodo from "../models/personaltodo.model";
import User from "../models/user.model";
import { connectToDatabase } from "../mongoose";

export async function fetchTodos(userId: string) {
    connectToDatabase();

    try {
        const todos = await PersonalTodo.find({ author: userId }).exec();
        const todoData = todos.map(todo => ({
            id: todo._id.toString(),
            author: todo.author.toString(),
            title: todo.title,
            description: todo.description,
            category: todo.category as "backlog" | "todo" | "doing" | "done" | string,
        }));
        
        return todoData;
    } catch (error) {
        console.error("Error fetching todos:", error);
        throw error; // Rethrow the error for handling elsewhere
    }
}

interface Params {
    title: string,
    description: string,
    author: string,
    category: string,
    path: string,
}

export async function createPersonalTodo({
    title,
    description,
    author,
    path,
    category
}: Params) {
    console.log("func fired")
    try {
        connectToDatabase();
        const createdTodo = await PersonalTodo.create({
            title,
            description,
            author,
            category
        });
        console.log(createdTodo);
        // Update User model
        await User.findByIdAndUpdate(author, {
            $push: { todos: createdTodo._id },
        });

        revalidatePath(path);
    } catch (error: any) {
        throw new Error(`Failed to create thread: ${error.message}`);
    }
}

interface UpdatePersonalTodoProps{
    id: string,
    title: string,
    description: string,
    author: string,
    category: string,
    path: string,
}
export async function updatePersonalTodo({
    id,
    title,
    description,
    author,
    path,
    category
}: UpdatePersonalTodoProps) {
    console.log("func fired")
    try {
        connectToDatabase();
        console.log({
            id,
            title,
            description,
            author,
            path,
        })
        const createdTodo = await PersonalTodo.findByIdAndUpdate(
            {
                _id: id
            },
            {
                title,
                description,
            }
        ).exec();
        console.log(createdTodo);

        revalidatePath(path);
    } catch (error: any) {
        throw new Error(`Failed to create thread: ${error.message}`);
    }
}

interface updatePersonalTodoCatProps {
    newData: {
        id: string,
        author: string,
        title: string,
        category: string,
    }[]
    
    author: string;
    // path: string;
}

export async function updatePersonalTodoCat({
    newData,
    author,
    // path,
}: updatePersonalTodoCatProps) {
    console.log("func fired")
    try {
        connectToDatabase();

        const deleteTodos = await PersonalTodo.deleteMany({
            author: author
        });
        const createdTodo = await PersonalTodo.insertMany(newData.map(item => ({ ...item, author: author }))); // Corrected line
        console.log(createdTodo);
        // Update User model
        await User.findByIdAndUpdate(author, {
            $push: { todos: createdTodo.map(todo => todo._id) },
        });

        // revalidatePath(path);
    } catch (error: any) {
        throw new Error(`Failed to create thread: ${error.message}`);
    }
}

interface deletePersonalTodoProps{
    id: string;
    path: string;
    author: string;
}
export async function deletePersonalTodo({
    id,
    path,
    author,
}: deletePersonalTodoProps): Promise<void> {
    try {
      connectToDatabase();
  
      // Find the thread to be deleted (the main thread)
      const threadIdToRemove = await PersonalTodo.findByIdAndDelete({_id: id});
  
      // Update User model
      await User.updateOne(
        { _id: author },
        { $pull: { todos: id } }
      );
      revalidatePath(path);
    } catch (error: any) {
      throw new Error(`Failed to delete thread: ${error.message}`);
    }
  }