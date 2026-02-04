import express, {Router} from "express";
import {Calorie} from "../models/Calorie";

export const CaloriesRoute = Router()


CaloriesRoute.get('/', async (req, res) => {
    try {
        const { type } = req.query;

        // Logique du filtre optionnel :
        // Si 'type' existe, on filtre dessus. Sinon, on prend un objet vide {} (tout).
        const filter = type ? { type } : {};

        // On cherche dans la BDD
        const entries = await Calorie.find(filter).sort({ createdAt: -1 });

        res.json(entries);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// ROUTE 2 : Ajouter une calorie
CaloriesRoute.post('/', async (req, res) => {
    try {
        console.log("Reçu :", req.body); // Petit log pour voir ce qui arrive

        const newEntry = await Calorie.create(req.body);

        // 201 signifie "Created" (Créé avec succès)
        res.status(201).json(newEntry);
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de l'ajout", error });
    }
});


