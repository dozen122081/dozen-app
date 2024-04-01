import mongoose  from 'mongoose';
const PersonalWorkspaceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    author: {
        type: String,
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

const PersonalWorkspace = mongoose.models.PersonalWorkspace || mongoose.model("PersonalWorkspace", PersonalWorkspaceSchema);

export default PersonalWorkspace;