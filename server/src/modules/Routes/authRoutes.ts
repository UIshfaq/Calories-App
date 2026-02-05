import express, { Router } from 'express';
import bcrypt from 'bcryptjs';
import {User} from '../models/User.js';
import { createAuthToken } from "../auth/auth.js"; // Correction 2 : Ajout de .js obligatoire

export const AuthRoute = Router();

AuthRoute.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email déjà utilisé" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: "Utilisateur créé avec succès" });

    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

AuthRoute.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Utilisateur inconnu" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Mot de passe incorrect" });

        const token = createAuthToken({
            userId: user._id.toString(),
            role: user.role as "admin" | "user"
        });

        res.json({ token, user });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});