import mongoose  from 'mongoose';
const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    image: String,
    onboarded: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    todos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Todos'
        }
    ],
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Notes'
        }
    ],
    tomorrow: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tomorrow'
        }
    ],
    streak: {
        type: Number,
    },
    organizations: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization'
        }
    ],
    workspaces: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Workspaces'
        }
    ],
})

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;