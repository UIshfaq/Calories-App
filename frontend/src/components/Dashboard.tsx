import { CalorieProvider } from '../context/CalorieContext';
import CaloriesBilan from './CaloriesBilan';
import CaloriesForm from './CaloriesEntriesForm'; // Vérifie bien l'extension .tsx ou .jsx
import CaloriesList from './CaloriesList';

const Dashboard = () => {
    return (
        // Le Provider est ici : il aura accès au Token de l'utilisateur connecté
        <CalorieProvider>
            <div className="App">
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
                    <h1>Examen : Suivi Calories</h1>
                    {/* On pourra ajouter un bouton Déconnexion ici plus tard */}
                </header>

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
};

export default Dashboard;