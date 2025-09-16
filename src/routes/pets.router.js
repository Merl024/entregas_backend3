import { Router } from "express";
import { petModel } from "../dao/models/pet.model.js";
import mongoose from "mongoose";

const router = Router()

router.get('/', async (req, res) => {
    try {
        const pets = await petModel.find()
        res.status(200).json(pets)

    } catch (error) {
        res.status(500).json({ status: 'error', error: 'No se pudo obtener los mascotas' })
    }
})

router.get('/:pid', async (req, res) => {
    try {
        const pet = await petModel.findById(req.params.pid)
        if (!pet) {
            return res.status(404).json({ status: 'error', error: 'Mascota no encontrada' })
        }
        res.status(200).json(pet)

    } catch (error) {
        res.status(500).json({ status: 'error', error: 'No se pudo obtener la mascota' })
    }
})

router.put('/:pid', async (req, res) => {
    try {
        const updatedPet = await petModel.findByIdAndUpdate(req.params.pid, req.body, { new: true })
        if (!updatedPet) {
            return res.status(404).json({ status: 'error', error: 'Mascota no encontrada' })
        }
        res.status(200).json({ status: 'success', message: 'Mascota actualizada', pet: updatedPet })
    } catch (error) {
        res.status(500).json({ status: 'error', error: 'No se pudo actualizar la mascota' })
    }
})

router.delete('/:pid', async (req, res) => {
    try {
        const deletePet = await petModel.findByIdAndDelete(req.params.pid)
        if (!deletePet) {
            return res.status(404).json({ status: 'error', error: 'Mascota no encontrada' })
        }
        res.status(200).json({ status: 'success', message: 'Mascota eliminada' })
    } catch (error) {
        res.status(500).json({ status: 'error', error: 'No se pudo eliminar la mascota' })
    }
})

router.post('/', async (req, res) => {
    try {
        const newPet = await petModel.create(req.body)
        res.status(201).json({ status: 'success', message: 'Mascota creada', pet: newPet })
    } catch (error) {
        res.status(500).json({ status: 'error', error: 'No se pudo crear la mascota' })
    }
})

export default router