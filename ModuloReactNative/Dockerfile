# Define la imagen base
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json
COPY . /app

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto
RUN npm install -g expo-cli

# Expone el puerto en el que se ejecutará el servidor Expo (opcional si se utiliza expo start --web)
EXPOSE 19006

# Comando predeterminado para ejecutar el servidor Expo web
CMD ["expo", "start", "--web"]
