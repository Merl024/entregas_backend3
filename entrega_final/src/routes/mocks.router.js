import { Router } from "express";
import { generateMockUsers } from "../utils/user.mocking.js";
import { generateMockPets } from "../utils/pet.mocking.js";
import userModel from "../dao/models/User.js";
import petModel from "../dao/models/Pet.js";

const router = Router()

router.get('/mockingpets', (req, res) => {
    try {
        const pets = generateMockPets(100)
        res.status(200).json(pets)
    } catch (error) {
        res.status(500).json({ status: 'error', error: 'No se pudo generar los mock pets' })
    }
})

router.get('/mockingusers',  (req, res) => {
    try {
        const users = generateMockUsers(50)
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ status: 'error', error: 'No se pudo generar los mock users' })
    }
})

router.post('/generatedata', async (req, res) => {
    const { users: numUsers, pets: numPets } = req.body

    if (!numUsers || !numPets) {
        return res.status(400).json({ status: 'error', error: 'Debe proporcionar la cantidad de usuarios y mascotas a generar' })
    }

    try {
        const usersInserted = generateMockUsers(numUsers)
        await userModel.insertMany(usersInserted)

        const petsInserted = generateMockPets(numPets)
        await petModel.insertMany(petsInserted)

        res.status(201).json({ status: 'success', message: `Se generaron ${usersInserted.length} usuarios y ${petsInserted.length} mascotas` })
        
    } catch (error) {
        console.error('Error al generar datos:', error)
        res.status(500).json({ status: 'error', error: 'No se pudo generar los datos' })
    }
})

export default router