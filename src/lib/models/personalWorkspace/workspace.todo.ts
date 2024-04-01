import mongoose  from 'mongoose';
const WorkspaceTodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    author: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "User",
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    category: {
        type: String,
    },
    workspaceId: {
        type: String,
    }
})

const WorkspaceTodo = mongoose.models.WorkspaceTodo || mongoose.model("WorkspaceTodo", WorkspaceTodoSchema);

export default WorkspaceTodo;