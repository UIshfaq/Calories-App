import {useCalories} from "../context/CalorieContext.tsx";
import {useState} from "react";


const CaloriesForm = () => {
    const { addEntry } = useCalories();

    const [intitule, setIntitule] = useState("");
    const [quantite, setQuantite] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addEntry({ intitule, quantite });
        setIntitule("");
        setQuantite(0);

    }

}