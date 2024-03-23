import mongoose  from 'mongoose';
const PersonalStickyNotesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    backgroundColor: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const PersonalStickyNotes = mongoose.models.PersonalStickyNotes || mongoose.model("PersonalStickyNotes", PersonalStickyNotesSchema);

export default PersonalStickyNotes;