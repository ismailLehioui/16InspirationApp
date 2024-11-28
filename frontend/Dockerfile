# Dockerfile for Frontend

# Utiliser Node.js pour builder l'application React
FROM node:18-alpine AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du code source et builder l'application React
COPY . .
RUN npm run build

# Utiliser Nginx pour servir les fichiers construits
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose le port 80 pour le frontend
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
