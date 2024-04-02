import mongoose  from 'mongoose';
const WorkspaceStickyNotesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    author: {
        type: String,
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
    workspaceId: {
        type: String,
    }
})

const WorkspaceStickyNotes = mongoose.models.WorkspaceStickyNotes || mongoose.model("WorkspaceStickyNotes", WorkspaceStickyNotesSchema);

export default WorkspaceStickyNotes;