import mongoose, { Schema } from "mongoose";

const DateSchema = new Schema({
    date: {
        type: String, 
    }, 
    author: {
        type: String, 
        required: true
    }, 
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const DateData = mongoose.models.DateData || mongoose.model("DateData", DateSchema);