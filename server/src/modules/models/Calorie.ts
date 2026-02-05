import mongoose from 'mongoose';

// Le Schema : C'est le plan de construction de tes données
const calorieSchema = new mongoose.Schema({
    intitule: {
        type: String,
        required: true // Le nom est obligatoire
    },
    quantite: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['apport', 'depense'],
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now // Ajoute la date automatiquement
    }
});


export const Calorie = mongoose.model('Calorie', calorieSchema);