import { createContext, useState, useContext, type ReactNode, useEffect } from 'react';

interface AuthContextType {
    token: string | undefined;
    role: string | undefined; // Nouveau !
    login: (token: string, role: string) => void; // On demande aussi le rôle
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // On charge le token ET le role depuis le stockage
    const [token, setToken] = useState<string | undefined>(localStorage.getItem('token') || undefined);
    const [role, setRole] = useState<string | undefined>(localStorage.getItem('role') || undefined);

    const login = (newToken: string, newRole: string) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('role', newRole); // On sauvegarde le rôle
        setToken(newToken);
        setRole(newRole);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setToken(undefined);
        setRole(undefined);
    };

    return (
        <AuthContext.Provider value={{ token, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth doit être utilisé dans AuthProvider");
    return context;
};