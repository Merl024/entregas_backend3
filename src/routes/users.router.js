import { Router } from "express";
import { userModel } from "../dao/models/user.model.js";
import bcrypt from "bcryptjs";

const router = Router()

router.get('/', async (req, res) => {
    try {
        const users = await userModel.find()
        res.status(200).json(users)

    } catch (error) {
        res.status(500).json({ status: 'error', error: 'No se pudo obtener los usuarios' })
    }
})

router.get('/:uid', async (req, res) => {
    try {
        const user = await userModel.findById(req.params.uid)
        if (!user) {
            return res.status(404).json({ status: 'error', error: 'Usuario no encontrado' })
        }
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({ status: 'error', error: 'No se pudo obtener el usuario' })
    }
})

router.put('/:uid', async (req, res) => {
    try {
        let updateData = req.body;
        if (updateData.password) {
            const salt = bcrypt.genSaltSync(10);
            updateData.password = bcrypt.hashSync(updateData.password, salt);
        }
        const updatedUser = await userModel.findByIdAndUpdate(req.params.uid, updateData, { new: true })
        if (!updatedUser) {
            return res.status(404).json({ status: 'error', error: 'Usuario no encontrado' })
        }
        res.status(200).json({ status: 'success', message: 'Usuario actualizado', user: updatedUser })
    } catch (error) {
        res.status(500).json({ status: 'error', error: 'No se pudo actualizar el usuario' })
    }
})

router.delete('/:uid', async (req, res) => {
    try {
        const deleteUser = await userModel.findByIdAndDelete(req.params.uid)
        if (!deleteUser) {
            return res.status(404).json({ status: 'error', error: 'Usuario no encontrado' })
        }
        res.status(200).json({ status: 'success', message: 'Usuario eliminado' })
    } catch (error) {
        res.status(500).json({ status: 'error', error: 'No se pudo eliminar el usuario' })
    }
})

router.post('/', async (req, res) => {
    try {
        let userData = req.body;
        if (userData.password) {
            const salt = bcrypt.genSaltSync(10);
            userData.password = bcrypt.hashSync(userData.password, salt);
        }
        const newUser = await userModel.create(userData)
        res.status(201).json({ status: 'success', message: 'Usuario creado', user: newUser })
    } catch (error) {
        res.status(500).json({ status: 'error', error: 'No se pudo crear el usuario' })
    }
})

export default router