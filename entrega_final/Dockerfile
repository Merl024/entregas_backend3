# Usar una imagen base específica de Node.js (más estable que 'node')
FROM node

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos de dependencias primero (para aprovechar cache de Docker)
COPY package*.json ./

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto que usa tu app
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD ["npm", "start"]