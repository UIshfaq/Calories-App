import { createContext, useState, useContext, type ReactNode, useEffect } from 'react';
import {useAuth} from "./AuthContexte.tsx";

export interface CalorieEntry {
    _id?: string;
    intitule: string;
    quantite: number;
    type: 'apport' | 'depense';
}

interface CalorieContextType {
    entries: CalorieEntry[];
    addEntry: (entry: Omit<CalorieEntry, '_id'>) => void; // va prendre tout sauf l'id
    deleteEntry: (id: string) => void;
    filtre: string;
    setFiltre: (val: string) => void;
}

const CalorieContext = createContext<CalorieContextType | undefined>(undefined);

export const CalorieProvider = ({ children }: { children: ReactNode }) => {
    const [entries, setEntries] = useState<CalorieEntry[]>([]);
    const [filtre, setFiltre] = useState('');


    const { token } = useAuth();

    const API_URL = 'http://localhost:3000/calorie';

    useEffect(() => {
        if (!token) return;

        const fetchCalories = async () => {
            try {
                const url = filtre
                    ? `${API_URL}?type=${filtre}`
                    : API_URL;

                const response = await fetch(url, {
                    // 3. ON AJOUTE LE TOKEN DANS LES HEADERS ICI
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setEntries(data);
                } else {
                    console.error("Erreur auth ou serveur");
                }
            } catch (error) {
                console.error("Erreur chargement API:", error);
            }
        };
        fetchCalories();
    }, [filtre, token]);



    const addEntry = async (entry: Omit<CalorieEntry, '_id'>) => {
        if (!token) return;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 4. Token obligatoire ici aussi
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(entry)
            });

            if (response.ok) {
                // Rechargement de la liste après ajout
                const url = filtre ? `${API_URL}?type=${filtre}` : API_URL;
                const res2 = await fetch(url, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data2 = await res2.json();
                setEntries(data2);
            }
        } catch (error) {
            console.error("Erreur API:", error);
        }
    };

    const deleteEntry = async (id: string) => {
        if (!token) return;
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                // 5. Et ici pour la suppression
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setEntries(current => current.filter(e => e._id !== id));
        } catch (error) {
            console.error("Erreur suppression:", error);
        }
    };
    return (
        <CalorieContext.Provider value={{ entries, addEntry, deleteEntry,filtre, setFiltre }}>
            {children}
        </CalorieContext.Provider>
    );
};

export const useCalories = () => {
    const context = useContext(CalorieContext);
    if (!context) throw new Error("Erreur de Provider");
    return context;
};