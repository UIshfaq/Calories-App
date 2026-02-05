import { useCalories } from "../context/CalorieContext";

const CaloriesBilan = () => {
    const { entries } = useCalories();

    const total = entries.reduce((acc, entry) => {
        return entry.type === 'apport'
            //if else classique .reduce fontionne grace a une accumulateur (acc) qui stocke la valeur courante du total et entry qui represente chaque element du tableau entries
            ? acc + entry.quantite
            : acc - entry.quantite;
    }, 0);

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
            <h2>Bilan Calorique</h2>
            <h3 style={{ color: total >= 0 ? 'green' : 'red', fontSize: '2em' }}>
                {total} kcal
            </h3>
        </div>
    );
};

export default CaloriesBilan;