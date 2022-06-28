import mongoose from 'mongoose'
const ANFT = new mongoose.Schema({
    imageUrl: {
        required: true,
        type: String,
    },
    name: {
        required: true,
        type: String,
    },
    user: {
        required: true,
        type: String,
    },
    price: { type: Number },
})
export const AnftDb = mongoose.model('ANFTDb', ANFT)
