# Proyecto Final · Backend III

API REST para la gestión de adopciones de mascotas, desarrollada como proyecto final del curso **Backend III: Testing y Escalabilidad** de Coderhouse. Incluye gestión de usuarios, mascotas y adopciones, generación de datos de prueba (mocking), documentación con Swagger, pruebas de integración y despliegue con Docker.

## 🧰 Stack

- **Backend:** Node.js, Express
- **Base de datos:** MongoDB Atlas con Mongoose
- **Autenticación:** JWT y bcrypt
- **Testing:** Mocha, Chai y Supertest
- **Documentación:** Swagger
- **Datos de prueba:** Faker
- **Contenedores:** Docker y Docker Hub

## 🏗️ Arquitectura

El proyecto sigue una arquitectura en capas: **routes → controllers → services → repository → DAO**, con **DTOs** para controlar los datos que se exponen en las respuestas.

---

## 📦 Imagen en Docker Hub

**Imagen publicada:** [merl024/entrega_final](https://hub.docker.com/r/merl024/entrega_final)
```bash
docker pull merl024/entrega_final:latest
```

---

## 🚀 Cómo ejecutar el proyecto con Docker

### 1. Clona el repositorio
```bash
git clone https://github.com/Merl024/entregas_backend3.git
cd entregas_backend3/entrega_final
```
> **Nota:** La imagen de Docker publicada corresponde únicamente al proyecto ubicado en la carpeta `entrega_final`.

### 2. Construir la imagen localmente (opcional)
```bash
docker build -t entrega_final .
```

### 3. Ejecutar el contenedor usando la imagen de Docker Hub
```bash
docker run -d \
  --name entrega_final \
  -p 8080:8080 \
  -e PORT=8080 \
  -e MONGO_URL="mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/backend3?retryWrites=true&w=majority" \
  -e NODE_ENV=production \
  merl024/entrega_final:latest
```

> **⚠️ Importante:** Reemplaza `<usuario>`, `<password>` y `<cluster>` con los datos de tu cuenta de MongoDB Atlas.

---

## ⚙️ Variables de entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `PORT` | Puerto en el que se ejecuta la aplicación | `8080` |
| `MONGO_URL` | Cadena de conexión a MongoDB | *Requerido* |
| `NODE_ENV` | Entorno de ejecución | `production` |

Para correr el proyecto sin Docker, usa `src/config/.env.default` como plantilla.

---

## 🛠️ Uso del proyecto

Una vez el contenedor esté corriendo, puedes acceder a:

- **API:** `http://localhost:8080/`
- **Documentación Swagger:** `http://localhost:8080/api-docs/`

Consulta la documentación Swagger para ver los endpoints disponibles.

---

## 🧪 Testing

Las pruebas de integración validan los flujos de adopción (creación de usuario, mascota y adopción) mediante peticiones HTTP reales a la API.

1. Levanta el servidor en el puerto `8080`.
2. En otra terminal, ejecuta:
```bash
npm test
```

---

## 📝 Detalles del Dockerfile

- ✅ Instalación de dependencias con `npm install`
- ✅ Copia de archivos del proyecto al contenedor
- ✅ Exposición del puerto 8080
- ✅ Comando de inicio con `npm start`

---

## 👤 Autora

Desarrollado, testeado y documentado por [Melisa Rivas](https://github.com/Merl024)