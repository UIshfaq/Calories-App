import { useCalories } from "../context/CalorieContext";

const CaloriesList = () => {
    const { entries, filtre, setFiltre, deleteEntry } = useCalories();

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px' }}>

            {/* Zone des 3 Boutons de filtre */}
            <div style={{ marginBottom: '15px' }}>
                <span style={{ marginRight: '10px' }}>Filtrer par : </span>

                <button
                    onClick={() => setFiltre('')}
                    disabled={filtre === ''}
                >
                    Tout
                </button>

                <button
                    onClick={() => setFiltre('apport')}
                    disabled={filtre === 'apport'}
                >
                    Apports
                </button>

                <button
                    onClick={() => setFiltre('depense')}
                    disabled={filtre === 'depense'}
                >
                    Dépenses
                </button>
            </div>

            {/* Affichage de la liste */}
            <ul>
                {entries.map((entry) => ( //.map pour parcourir le tableau entries et afficher chaque element dans une liste
                    <li key={entry._id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '5px' }}>
                        <span>
                            <strong>{entry.intitule}</strong>
                            <small> ({entry.type})</small>
                        </span>

                        <button
                            onClick={() => {
                                if (entry._id) {
                                    deleteEntry(entry._id);
                                }
                            }}
                        >
                            Supprimer 🗑
                        </button>

                        <span style={{ color: entry.type === 'apport' ? 'green' : 'red', fontWeight: 'bold' }}>
                            {entry.type === 'apport' ? '+' : '-'}{entry.quantite} kcal
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CaloriesList;