import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {CaloriesRoute} from "./modules/Routes/CaloriesRoute.js";


const app = express();
app.use(express.json());
app.use(cors());

// Connexion à MongoDB (l'URL vient de ton docker-compose)
mongoose.connect('mongodb://root:example@localhost:27017/calories_db?authSource=admin')
    .then(() => console.log('Connecté à MongoDB !'))
    .catch(err => console.error('Erreur Mongo:', err));

app.use('/calorie', CaloriesRoute);



const PORT = 3000;
app.listen(PORT, () => console.log(`Serveur sur http://localhost:${PORT}`));