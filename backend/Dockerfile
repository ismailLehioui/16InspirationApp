# Utiliser Node.js 18.18.1 comme base
FROM node:18.18.1-alpine

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier le fichier package.json et installer les dépendances
COPY package.json package-lock.json ./
RUN npm install

# Copier le reste des fichiers
COPY . .

# Exposer le port sur lequel l'application écoute
EXPOSE 5000

# Démarrer le serveur avec nodemon
CMD ["npm", "run", "server"]
