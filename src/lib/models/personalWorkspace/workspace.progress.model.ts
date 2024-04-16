import mongoose  from 'mongoose';
const WorkspaceProgressSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    trackedDate: {
        type: String,
    },
    totalCompletedTasks: {
        type: Number
    },
    workspaceId: {
        type: String,
    },
})

const WorkspaceProgress = mongoose.models.WorkspaceProgress || mongoose.model("WorkspaceProgress", WorkspaceProgressSchema);

export default WorkspaceProgress;