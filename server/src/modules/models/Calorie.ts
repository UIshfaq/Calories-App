import mongoose from 'mongoose';

// Le Schema : C'est le plan de construction de tes données
const calorieSchema = new mongoose.Schema({
    intitule: {
        type: String,
        required: true // Le nom est obligatoire
    },
    quantite: {
        type: Number,
        required: true // La quantité est obligatoire
    },
    type: {
        type: String,
        enum: ['apport', 'depense'], // On n'accepte que ces deux mots
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now // Ajoute la date automatiquement
    }
});

// Le Model : C'est l'outil qui permet de faire des recherches, des ajouts, etc.
// MongoDB va automatiquement créer une collection nommée "calories" (au pluriel)
export const Calorie = mongoose.model('Calorie', calorieSchema);