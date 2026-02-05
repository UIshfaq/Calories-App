import { User } from '../models/User.js';

export const adminMiddleware = async (req: any, res: any, next: any) => {
    try {
        const userId = req.auth.userId;


        const user = await User.findById(userId);




        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: "Accès interdit : Réservé aux administrateurs" });
        }

        next();
    } catch (error) {
        console.log("Erreur technique:", error);
        res.status(500).json({ error });
    }
};