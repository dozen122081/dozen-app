import mongoose from "mongoose";

let isAlreadyConnected = false;

export async function connectToDatabase(){
    mongoose.set('strictQuery', true);

    if(!process.env.MONGODB_URL) return console.error("Mongodb url not found")

    if(isAlreadyConnected) return console.log("Already connected to mongodb");

    try {
        await mongoose.connect(process.env.MONGODB_URL)
        isAlreadyConnected = true;
        console.log("Successfully connected to mongodb")
    } catch (error) {
        console.error(error)
    }
}