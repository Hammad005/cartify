import mongoose from "mongoose";

export const userScheema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: 6
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'client']
    },

}, { timestamps: true });
const User = mongoose.model("User", userScheema);
export default User;