import mongoose  from 'mongoose';
const PersonalTodoSchema = new mongoose.Schema({
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
    category: {
        type: String,
    },
})

const PersonalTodo = mongoose.models.PersonalTodo || mongoose.model("PersonalTodo", PersonalTodoSchema);

export default PersonalTodo;