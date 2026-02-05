import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema({
    intitule: { type: String, required: true },
    quantite: { type: Number, required: true },
    type: {
        type: String,
        enum: ['apport', 'depense'],
        required: true
    }
});

export const Template = mongoose.model('Template', templateSchema);