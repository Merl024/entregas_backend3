import express from 'express';
import mongoose from 'mongoose';
import config from './config/config.js';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import __dirname from './utils/index.js';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js'

const app = express();
const PORT = config.port || 8080
const connection = config.mongoUrl || 'mongodb://localhost:27017'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Adoptme API',
      version: '1.0.0',
      description: 'API documentation for the Adoptme backend',
    },
    servers: [
      { url: 'http://localhost:8080', description: 'Local server' }
    ],
  },
  apis: [__dirname + "/docs/*.yaml"]
};

//  MIDDLEWARES
app.use(express.json());
app.use(cookieParser());

// CONEXION CON LA BASE DE DATOS
mongoose.connect(connection)
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.error('Error al conectar a la base de datos:', err))

const swaggerSpec = swaggerJSDoc(options);

// RUTAS
app.use('/api/mocks', mocksRouter)
app.use('/api/users',usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);

// Swagger UI and JSON spec
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Prueba que corre
app.get('/', (req, res)=> {
  res.send('Servidor Funcionando')
})

app.listen(PORT,()=> {
    console.log(`Servidor siendo escuchado en ${PORT}`)
    console.log(`Base de datos en ${connection}`)
  }
)
