import mongoose  from 'mongoose';
const WorkspaceDayTaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    taskFor: {
        type: String,
    },
    workspaceId: {
        type: String,
    },
    completed: {
        type: Boolean,
    }
})

const WorkspaceDayTask = mongoose.models.WorkspaceDayTask || mongoose.model("WorkspaceDayTask", WorkspaceDayTaskSchema);

export default WorkspaceDayTask;