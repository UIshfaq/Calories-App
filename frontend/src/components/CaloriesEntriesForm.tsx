import { useCalories } from "../context/CalorieContext.tsx";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContexte.tsx";

// 1. On définit la forme d'un Template pour TypeScript
interface Template {
    _id: string;
    intitule: string;
    quantite: number;
    type: 'apport' | 'depense';
}

const CaloriesForm = () => {
    const { addEntry } = useCalories();
    const { token } = useAuth();

    const [intitule, setIntitule] = useState("");
    const [quantite, setQuantite] = useState(0);
    const [type, setType] = useState<'apport' | 'depense'>('apport');

    // 2. On déclare le State pour stocker la liste des templates
    const [templates, setTemplates] = useState<Template[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addEntry({ intitule, quantite, type });
        setIntitule("");
        setQuantite(0);
    }

    // 3. Fonction pour remplir le formulaire quand on clique sur un template
    const handleSelectTemplate = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const templateId = e.target.value;
        if (!templateId) return;

        // On cherche le template correspondant dans la liste
        const selected = templates.find(t => t._id === templateId);

        if (selected) {
            // On remplit les champs automatiquement
            setIntitule(selected.intitule);
            setQuantite(selected.quantite);
            setType(selected.type);
        }
    };

    useEffect(() => {
        const fetchTemplates = async () => {
            if (!token) return;

            try {
                // On appelle le backend pour avoir la liste
                const response = await fetch('http://localhost:3000/templates', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.ok) {
                    const data = await response.json();
                    setTemplates(data); // On met à jour la liste
                }
            } catch (error) {
                console.error("Erreur chargement templates", error);
            }
        };

        fetchTemplates();
    }, [token]);

    return (
        <div >

            {/* 4. Affichage de la liste déroulante (Seulement si on a des templates) */}
            {templates.length > 0 && (
                <div style={{ marginBottom: '15px' }}>
                    <label >
                        ⚡ Remplissage rapide :
                    </label>
                    <select
                        onChange={handleSelectTemplate}
                        defaultValue=""
                        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                    >
                        <option value="">-- Choisir un modèle --</option>
                        {templates.map((t) => (
                            <option key={t._id} value={t._id}>
                                {t.intitule} ({t.quantite} kcal)
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Le formulaire classique */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                <input
                    type="text"
                    placeholder="Ex: Pomme"
                    value={intitule}
                    onChange={(e) => setIntitule(e.target.value)}
                    required
                />

                <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="number"
                        value={quantite}
                        onChange={(e) => setQuantite(Number(e.target.value))}
                        required
                    />
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value as 'apport' | 'depense')}

                    >
                        <option value="apport">Apport (+)</option>
                        <option value="depense">Dépense (-)</option>
                    </select>
                </div>

                <button>
                    Ajouter
                </button>
            </form>
        </div>
    );
}

export default CaloriesForm;