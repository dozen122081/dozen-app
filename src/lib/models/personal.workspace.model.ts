import mongoose  from 'mongoose';
import { string } from 'zod';
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
    workspaceProgressData: [
        {
            type: string,  
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const PersonalWorkspace = mongoose.models.PersonalWorkspace || mongoose.model("PersonalWorkspace", PersonalWorkspaceSchema);

export default PersonalWorkspace;