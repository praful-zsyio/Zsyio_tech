import React, { createContext, useState, useEffect } from 'react';
import { login as apiLogin, logout as apiLogout, ACCESS_TOKEN } from '../services/api';
import Reactotron from '../../ReactotronConfig';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if token exists
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            // In a real app, you might want to validate the token or fetch user profile here
            setUser({ isAuthenticated: true });
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            await apiLogin(username, password);
            setUser({ username, isAuthenticated: true });
            if (import.meta.env.DEV) Reactotron.display({ name: 'AUTH', value: { username }, preview: 'Login Success' });
            return { success: true };
        } catch (error) {
            console.error("Login failed", error);
            if (import.meta.env.DEV) Reactotron.error('Login Failed', error);
            return { success: false, error: error.response?.data?.detail || "Login failed" };
        }
    };

    const logout = () => {
        apiLogout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
