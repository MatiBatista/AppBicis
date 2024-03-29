# Usa una imagen base con Node.js 18
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el código fuente de tu aplicación dentro del contenedor
COPY . /app

# Instala las dependencias utilizando npm
RUN npm install

# Instala expo-cli globalmente
RUN npm install -g expo-cli

# Exponer el puerto que utiliza tu aplicación
EXPOSE 19006

# Ejecuta el comando para iniciar tu aplicación en modo web
CMD ["expo", "start", "--web", "--port", "19006"]
