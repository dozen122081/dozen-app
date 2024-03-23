import mongoose  from 'mongoose';
const PersonalTomorrowSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
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
    completed: {
        type: Boolean,
    }
})

const PersonalTomorrow = mongoose.models.PersonalTomorrow || mongoose.model("PersonalTomorrow", PersonalTomorrowSchema);

export default PersonalTomorrow;