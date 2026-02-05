import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import './App.css';
import {AuthProvider, useAuth} from "./context/AuthContexte.tsx";
import Login from "./Screen/Login.tsx";
import type {JSX} from "react";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const { token } = useAuth();
    return token ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Route Publique : La page de Login */}
                    <Route path="/login" element={<Login />} />

                    {/* Route Protégée : Le Dashboard (Ton app de Calories) */}
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;