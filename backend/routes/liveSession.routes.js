const express = require("express");
const liveSessionRouter = express.Router();
const { LiveSessionModel } = require('../models/liveSession.model'); // Importez votre modèle de session

// Route pour planifier une session en direct
liveSessionRouter.post("/schedule", async (req, res) => {
    const { date, telegramLink } = req.body;

    try {
        // Créer une nouvelle session en direct
        const newSession = new LiveSessionModel({
            date,
            telegramLink,
        });

        await newSession.save();
        res.status(201).json({ message: "Session en direct planifiée avec succès.", session: newSession });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Erreur lors de la planification de la session." });
    }
});

// Route pour vérifier si une session est en direct
liveSessionRouter.get("/check-live", async (req, res) => {
    try {
        const currentDate = new Date();
        const liveSession = await LiveSessionModel.findOne({ date: { $gte: currentDate }, isLive: true });

        if (liveSession) {
            res.status(200).json({ message: "Une session est en direct.", session: liveSession });
        } else {
            res.status(404).json({ message: "Aucune session en direct." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la vérification de la session en direct." });
    }
});

module.exports = {
    liveSessionRouter
};

