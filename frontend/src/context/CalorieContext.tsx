import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export interface CalorieEntry {
    _id?: string;
    intitule: string;
    quantite: number;
    type: 'apport' | 'depense';
}

interface CalorieContextType {
    entries: CalorieEntry[];
    addEntry: (entry: Omit<CalorieEntry, '_id'>) => void;
    filtre: string;
    setFiltre: (val: string) => void;
}

const CalorieContext = createContext<CalorieContextType | undefined>(undefined);

export const CalorieProvider = ({ children }: { children: ReactNode }) => {
    const [entries, setEntries] = useState<CalorieEntry[]>([]);
    const [filtre, setFiltre] = useState('');


    useEffect(() => {
        const fetchCalories = async () => {
            try {
                const url = filtre
                    ? `http://localhost:3000/calorie?type=${filtre}`
                    : `http://localhost:3000/calorie`;

                const response = await fetch(url);
                const data = await response.json();
                setEntries(data);
            } catch (error) {
                console.error("Erreur chargement API:", error);
            }
        };
        fetchCalories();
    }, [filtre]);



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