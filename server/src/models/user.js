import mongoose from 'mongoose'

const User = new mongoose.Schema({
    email: {
        required: true,
        type: String,
        unique: true,
    },
    password: {
        required: true,
        type: String,
    },
})
export const UserDb = mongoose.model('UserDb', User)
