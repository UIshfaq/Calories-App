import { CalorieProvider } from './context/CalorieContext';
import CaloriesBilan from './components/CaloriesBilan';
import CaloriesForm from './components/CaloriesEntriesForm.tsx';
import CaloriesList from './components/CaloriesList'; // Assure-toi que ce fichier existe


import './App.css';

function App() {
    return (
        <CalorieProvider>
            <div className="App">
                <h1>Examen : Suivi Calories</h1>

                <div className="container">
                    <div className="zone bilan-zone">
                        <CaloriesBilan />
                    </div>

                    <div className="zone form-zone">
                        <h2>Ajouter</h2>
                        <CaloriesForm />
                    </div>

                    <div className="zone list-zone">
                        <h2>Historique</h2>
                        <CaloriesList />
                    </div>
                </div>
            </div>
        </CalorieProvider>
    );
}

export default App;