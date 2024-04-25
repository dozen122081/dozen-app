import { Schema, model, models } from "mongoose";

const PersonalNotesSchema = new Schema ({
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
    }
})

export const PersonalNotes = models.PersonalNotes || model("PersonalNotes", PersonalNotesSchema)