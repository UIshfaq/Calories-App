import express, {Router} from 'express';
import { Template } from '../models/Template.js';
import { authMiddleware } from '../auth/auth.js';
import {adminMiddleware} from "../auth/Isadmin";


export const TemplateRoute = Router();

TemplateRoute.use(authMiddleware);

TemplateRoute.get('/', async (req, res) => {
    try {
        const templates = await Template.find();
        res.json(templates);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
});

TemplateRoute.post('/', adminMiddleware ,async (req, res) => {
    try {
        const newTemplate = await Template.create(req.body);
        res.status(201).json(newTemplate);
    } catch (error) {
        res.status(400).json({ message: "Erreur création" });
    }
});