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
        try {
            const response = await fetch('http://localhost:3000/calorie', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(entry)
            });

            if (response.ok) {


                const url = filtre
                    ? `http://localhost:3000/calorie?type=${filtre}`
                    : `http://localhost:3000/calorie`;
                const res2 = await fetch(url);
                const data2 = await res2.json();
                setEntries(data2);
            }
        } catch (error) {
            console.error("Erreur ajout API:", error);
        }
    };

    return (
        <CalorieContext.Provider value={{ entries, addEntry, filtre, setFiltre }}>
            {children}
        </CalorieContext.Provider>
    );
};

export const useCalories = () => {
    const context = useContext(CalorieContext);
    if (!context) throw new Error("Erreur de Provider");
    return context;
};