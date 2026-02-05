import { useCalories } from "../context/CalorieContext.tsx";
import { useState } from "react";


const CaloriesForm = () => {
    const { addEntry } = useCalories();

    const [intitule, setIntitule] = useState("");
    const [quantite, setQuantite] = useState(0);
    const [type, setType] = useState<'apport' | 'depense'>('apport');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addEntry({ intitule, quantite, type });
        setIntitule("");
        setQuantite(0);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Ex: Pomme"
                value={intitule}
                onChange={(e) => setIntitule(e.target.value)}
                required
            />
            <input
                type="number"
                value={quantite}
                onChange={(e) => setQuantite(Number(e.target.value))}
                required
            />
            <select value={type} onChange={(e) => setType(e.target.value as 'apport' | 'depense')}>
                <option value="apport">Apport</option>
                <option value="depense">Dépense</option>
            </select>
            <button type="submit">Ajouter</button>

        </form>
    );
}

export default CaloriesForm;