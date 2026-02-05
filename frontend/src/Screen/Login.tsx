import { useState } from "react";
import { useAuth } from "../context/AuthContexte.tsx"; // Vérifie le chemin (Contexte ou AuthContext ?)
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            // 1. ON APPELLE LE BACKEND (C'est ça qui manquait !)
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Erreur de connexion");
            }


            login(data.token, data.role);

            navigate("/");

        } catch (err: any) {
            console.error(err);
            setError(err.message);
        }
    };

    return (
        <div className="login-container" style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <h2>Connexion</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Se connecter</button>

                <button type="button" onClick={() => navigate('/register')} style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}>
                    Pas de compte ? Créer un compte
                </button>
            </form>
        </div>
    );
};

export default Login;