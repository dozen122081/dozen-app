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
    }, 
    workspaceId: {
        type: String, 
    }
})

export const WorkspaceDate = mongoose.models.WorkspaceDate || mongoose.model("WorkspaceDate", DateSchema);