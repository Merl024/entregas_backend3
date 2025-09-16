// IMPORTACIONES DE DEPENDENCIAS Y ROUTES
import express from "express";
import mongoose from "mongoose";
import config from "./config/config.js";
import mocksRouter from "./routes/mocks.router.js";
import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";

const app = express()
const PORT = config.port || 8080
const MONGO = config.mongoUrl || 'mongodb://localhost:27017'

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CONEXIÓN A LA BASE DE DATOS
mongoose.connect(MONGO)
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.error('Error al conectar a la base de datos:', err))

// RUTAS 
app.use('/api/mocks', mocksRouter)
app.use('/api/users', usersRouter)
app.use('/api/pets', petsRouter)

app.get('/', (req, res) => {
    res.send('Servidor funcionando')
})

// SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
    console.log(`Base de datos en ${MONGO}`);
    
})