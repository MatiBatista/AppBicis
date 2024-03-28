# Usa una imagen base con la última versión estable de Node.js
FROM node:latest

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el código fuente de tu aplicación dentro del contenedor
COPY . /app

# Instala las dependencias utilizando npm
RUN npm install

# Exponer el puerto que utiliza tu aplicación
EXPOSE 19006

# Ejecuta el comando para iniciar tu aplicación en modo web
CMD ["npm", "start"]
