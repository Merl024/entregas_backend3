# Proyecto Final

Este es mi proyecto final del curso de Backend III: Testing y Escalabilidad

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
git clone https://github.com/tu_usuario/entrega_final.git
cd entrega_final
```
> **Nota:** La imagen de Docker publicada corresponde únicamente al proyecto ubicado en la carpeta entrega_final Si clonas el repositorio completo, asegúrate de posicionarte en entrega_final para construir o ejecutar la imagen Docker.


### 2. Construir la imagen localmente - opcional

Si quieres construir la imagen tú mismo:
```bash
docker build -t entrega_final .
```

### 3. Ejecutar el contenedor usando la imagen de Docker Hub
```bash
docker run -d \
  --name entrega_final \
  -p 8080:8080 \
  -e PORT=8080 \
  -e MONGO_URL="mongodb+srv://<usuario>:<password>@cluster0.r2hms.mongodb.net/backend3?retryWrites=true&w=majority&appName=Cluster0" \
  -e NODE_ENV=production \
  merl024/entrega_final:latest
```

> **⚠️ Importante:** Reemplaza `<usuario>` y `<password>` con tus credenciales de MongoDB Atlas.

---

## 📝 Detalles del Dockerfile

El Dockerfile incluye:

- ✅ Instalación de dependencias con `npm install`
- ✅ Copia de archivos del proyecto al contenedor
- ✅ Exposición del puerto 8080
- ✅ Comando de inicio con `npm start`

---

## ⚙️ Variables de entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `PORT` | Puerto en el que se ejecuta la aplicación | `8080` |
| `MONGO_URL` | Cadena de conexión a MongoDB | *Requerido* |
| `NODE_ENV` | Entorno de ejecución | `production` |

---

## 🛠️ Uso del proyecto

Una vez el contenedor esté corriendo, puedes acceder a:

- **API:** `http://localhost:8080/`
- **Documentación Swagger:** `http://localhost:8080/api-docs/`

Consulta la documentación Swagger para ver los endpoints disponibles de la entidad de usuario.

---

## 🧪 Testing

Para ejecutar los tests localmente:
```bash
npm test
```

---
## 👤 Autora
Testeado y documentado por [Melisa Rivas]()
