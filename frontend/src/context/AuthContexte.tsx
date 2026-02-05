import { createContext, PropsWithChildren, useContext, useState } from "react";

export type AuthContextType = {
    token?: string;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
    login: async () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [token, setToken] = useState<string | undefined>(localStorage.getItem('token') || undefined);

    const login = async (email: string, password: string) => {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Erreur de connexion");
        }

        const json = await response.json();

        localStorage.setItem('token', json.token);
        setToken(json.token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(undefined);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                logout,
                login,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};