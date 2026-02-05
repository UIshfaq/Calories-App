import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Erreur lors de l'inscription");
            }

            alert("Compte créé avec succès ! Connectez-vous.");
            navigate("/login");

        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Inscription</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block' }}>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block' }}>Mot de passe</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <button type="submit" style={{ width: '100%', padding: '10px', marginTop: '10px' }}>
                    S'inscrire
                </button>
            </form>

            <p style={{ marginTop: '20px' }}>
                Déjà un compte ? <Link to="/login">Se connecter</Link>
            </p>
        </div>
    );
};

export default Register;