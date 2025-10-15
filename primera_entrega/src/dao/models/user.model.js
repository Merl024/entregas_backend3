import mongoose from "mongoose";

const userCollection = 'users'

const userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: [/.+\@.+\..+/, 'El email no es válido']
    },
    age: Number,
    password: {
        type: String,
        required: true
    },
    pets: {
        type: [ mongoose.Schema.Types.ObjectId ],
        ref: 'pets',
        default: []
    },
    role: {
        type: String,
        default: 'user',
        enum: ['admin', 'user']
    }
})

export const userModel = mongoose.model(userCollection, userSchema)