import { CalorieProvider } from '../context/CalorieContext';
import CaloriesBilan from './CaloriesBilan';
import CaloriesForm from './CaloriesEntriesForm'; // Vérifie bien l'extension .tsx ou .jsx
import CaloriesList from './CaloriesList';
import {useAuth} from "../context/AuthContexte.tsx";
import { useNavigate } from "react-router-dom"; // N'oublie pas cet import

const Dashboard = () => {
    const { logout ,role} = useAuth();
    const navigate = useNavigate(); // Hook pour naviguer


    return (
        <CalorieProvider>
            <div className="App">
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
                    <h1>Examen : Suivi Calories</h1>
                </header>
                {role === 'admin' && (
                    <button
                        onClick={() => navigate('/admin')}
                    >
                        ⚙️ Gérer les Templates
                    </button>
                )}
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
                    <button onClick={logout}> Se deconnecter</button>
                </div>
            </div>
        </CalorieProvider>
    );
};

export default Dashboard;