import express, {Router} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {User} from '../models/User.js';

export const AuthRoute = Router()


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

    } catch (err) {
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

        const token = jwt.sign(
            { id: user._id, role: user.role },
            "TA_CLE_SECRETE",
            { expiresIn: "24h" }
        );

        res.json({ token, user: { id: user._id, email: user.email, role: user.role } });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

