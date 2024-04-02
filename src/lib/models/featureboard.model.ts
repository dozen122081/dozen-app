import mongoose  from 'mongoose';
const FbTodoSchema = new mongoose.Schema({
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
    category: {
        type: String,
    },
})

const FbTodo = mongoose.models.FbTodo || mongoose.model("FbTodo", FbTodoSchema);

export default FbTodo;