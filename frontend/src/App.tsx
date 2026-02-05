import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import './App.css';
import { AuthProvider, useAuth } from "./context/AuthContexte.tsx";
import Login from "./Screen/Login.tsx";
import type { JSX } from "react";
import Register from "./Screen/Register.tsx";
import AdminPage from "./Screen/AdminPage.tsx";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const { token } = useAuth();
    return token ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }: { children: JSX.Element }) => {
    const { token, role } = useAuth();

    if (!token) return <Navigate to="/login" />;

    if (role !== 'admin') return <Navigate to="/" />;

    return children;
};

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Routes Publiques */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />

                    {/* Route Admin (Accessible uniquement aux Admins) */}
                    <Route
                        path="/admin"
                        element={
                            <AdminRoute>
                                <AdminPage />
                            </AdminRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;