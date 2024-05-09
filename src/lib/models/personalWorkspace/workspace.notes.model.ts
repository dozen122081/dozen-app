import { Schema, model, models } from "mongoose";

const WorkspaceNotesSchema = new Schema ({
    title: {
        type: String,
        required: true, 
    },
    content: {
        type: String,
    },
    author: {
        type: String,
        ref: "User",
        required: true,
    },
    date: {
        type: String,
        default: Date.now
    }, 
    workspaceId: {
        type: String, 
    }
})

export const WorkspaceNotes = models.WorkspaceNotes || model("WorkspaceNotes", WorkspaceNotesSchema)