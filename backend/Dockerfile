# Dockerfile for Backend

# 1. Utiliser l'image Node.js 18 (selon ta version installée)
FROM node:18-alpine

# 2. Définit le répertoire de travail
WORKDIR /app

# 3. Copie des fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# 4. Installation des dépendances du backend
RUN npm install

# 5. Copie du code source
COPY . .

# 6. Expose le port utilisé par le backend
EXPOSE 5000

# 7. Démarrer l'application
CMD ["node", "index.js"]
