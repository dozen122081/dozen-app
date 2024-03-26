import mongoose from "mongoose";

let isAlreadyConnected = false;
const uri = 'mongodb://myUserAdmin:dozen2081@localhost:27017/admin';
export async function connectToDatabase(){
    mongoose.set('strictQuery', true);

    if(!process.env.MONGODB_URL) return console.error("Mongodb url not found")

    if(isAlreadyConnected) return console.log("Already connected to mongodb");

    try {
        await mongoose.connect(process.env.MONGODB_URL)
        // await mongoose.connect(uri, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     // Other options if needed
        // });
        isAlreadyConnected = true;
        console.log("Successfully connected to mongodb")
    } catch (error) {
        console.error(error)
    }
}