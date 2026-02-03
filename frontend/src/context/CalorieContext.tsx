import { createContext, useState, useContext } from 'react';

export interface CalorieEntry {
    _id?: string;
    intitule: string;
    quantite: number;
}

// On définit ce que notre "magasin" (Context) partage
interface CalorieContextType {
    entries: CalorieEntry[];
    addEntry: (entry: CalorieEntry) => void;
    setEntries: (entries: CalorieEntry[]) => void;
}

// --- LE CONTEXT ---
const CalorieContext = createContext<CalorieContextType | undefined>(undefined);

export const CalorieProvider = ({ children }: { children: ReactNode }) => {
    const [entries, setEntries] = useState<CalorieEntry[]>([]);

    const addEntry = (entry: CalorieEntry) => {
        setEntries((prev) => [...prev, entry]);
    };

    return (
        <CalorieContext.Provider value={{ entries, addEntry, setEntries }}>
            {children}
        </CalorieContext.Provider>
    );
};

// Hook pour utiliser les données facilement
export const useCalories = () => {
    const context = useContext(CalorieContext);
    if (!context) throw new Error("Erreur de Provider");
    return context;
};