import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContexte";

const AdminPage = () => {
    const navigate = useNavigate();
    const { token } = useAuth();

    const [intitule, setIntitule] = useState("");
    const [quantite, setQuantite] = useState("");
    const [type, setType] = useState<'apport' | 'depense'>('apport');
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await fetch('http://localhost:3000/templates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    intitule,
                    quantite: Number(quantite),
                    type
                })
            });

            if (response.ok) {
                setMessage("Template ajouté avec succès !");
                setIntitule("");
                setQuantite("");
            } else {
                setMessage(" Erreur : Impossible d'ajouter (Es-tu bien Admin ?)");
            }
        } catch (error) {
            console.error(error);
            setMessage(" Erreur serveur");
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>

            <button
                onClick={() => navigate('/')}
                style={{
                    marginBottom: '20px',
                    padding: '8px 15px',
                    cursor: 'pointer',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px'
                }}
            >
                ⬅️ Retour au Dashboard
            </button>

            <h1>⚙️ Administration</h1>
            <p>Ajoutez ici les modèles d'aliments pour les utilisateurs.</p>

            <div style={{
                border: '2px solid orange',
                padding: '20px',
                background: '#fffbe6',
                borderRadius: '8px',
                marginTop: '20px'
            }}>
                <h3 style={{ color: '#d35400', marginTop: 0 }}>Ajouter un nouveau modèle</h3>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                            placeholder="Nom (ex: Pizza)"
                            value={intitule}
                            onChange={e => setIntitule(e.target.value)}
                            required
                            style={{ flex: 1, padding: '8px' }}
                        />

                        <input
                            type="number"
                            placeholder="Kcal"
                            value={quantite}
                            onChange={e => setQuantite(e.target.value)}
                            required
                            style={{ width: '80px', padding: '8px' }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <select
                            value={type}
                            onChange={e => setType(e.target.value as any)}
                            style={{ flex: 1, padding: '8px' }}
                        >
                            <option value="apport">Apport (+)</option>
                            <option value="depense">Dépense (-)</option>
                        </select>

                        <button
                            type="submit"
                            style={{
                                background: '#d35400',
                                color: 'white',
                                border: 'none',
                                padding: '8px 20px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            Ajouter
                        </button>
                    </div>
                </form>

                {/* Message de confirmation */}
                {message && <p style={{ marginTop: '15px', fontWeight: 'bold' }}>{message}</p>}
            </div>
        </div>
    );
};

export default AdminPage;