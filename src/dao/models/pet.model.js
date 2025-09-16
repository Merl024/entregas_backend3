import mongoose from "mongoose"

const petsCollection = 'pets'

const petsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    species: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
})

export const petModel = mongoose.model(petsCollection, petsSchema)