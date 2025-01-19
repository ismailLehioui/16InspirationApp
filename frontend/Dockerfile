# Utiliser Node.js 18.18.1 pour construire l'application React
FROM node:18.18.1-alpine as build

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier le fichier package.json et installer les dépendances
COPY package.json package-lock.json ./
RUN npm install

# Copier le reste des fichiers et exécuter le build
COPY . .
COPY .env .env
RUN npm run build


# Utiliser nginx pour servir les fichiers construits
FROM nginx:alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Démarrer nginx
CMD ["nginx", "-g", "daemon off;"]
