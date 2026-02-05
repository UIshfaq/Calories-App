import express, { Router } from 'express';
import { Calorie } from '../models/Calorie.js';
import { authMiddleware } from '../auth/auth.js';

export const CaloriesRoute = Router();

CaloriesRoute.use(authMiddleware);

CaloriesRoute.get('/', async (req: any, res) => {
    try {
        const { type } = req.query;
        const userId = req.auth.userId;

        const filter = type
            ? { user: userId, type }
            : { user: userId };

        const entries = await Calorie.find(filter).sort({ createdAt: -1 });

        res.json(entries);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
});

CaloriesRoute.post('/', async (req: any, res) => {
    try {
        const userId = req.auth.userId;

        const newEntry = new Calorie({
            ...req.body,
            user: userId
        });

        const savedEntry = await newEntry.save();

        res.status(201).json(savedEntry);
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de l'ajout", error });
    }
});