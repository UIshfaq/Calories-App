import { CalorieProvider, useCalories } from './context/CalorieContext';
import CaloriesForm from './components/CaloriesEntriesForm';
import './App.css';

const CaloriesList = () => {
    const { entries } = useCalories();
    return (
        <ul>
            {entries.map((entry, index) => (
                <li key={index}>
                    <strong>{entry.intitule}</strong> : {entry.quantite} kcal ({entry.type === 'apport' ? 'Apport' : 'Dépense'})
                </li>
            ))}
        </ul>
    );
};

function App() {
    return (
        <CalorieProvider>
            <div className="App">
                <h1>Suivi des Calories</h1>
                <CaloriesForm />
                <CaloriesList />
            </div>
        </CalorieProvider>
    );
}

export default App;
