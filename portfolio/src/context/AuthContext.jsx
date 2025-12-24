
import React, { createContext, useContext, useState, useEffect } from "react";
import { ENDPOINTS } from "../services/apiEndpoints";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedAuth = localStorage.getItem("isAuthenticated");
        const storedUser = localStorage.getItem("user");

        if (storedAuth === "true") {
            setIsAuthenticated(true);
            setUser(storedUser);
        }

        setLoading(false);
    }, []);

    function login(username) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", username);

        setIsAuthenticated(true);
        setUser(username);
    }

    async function logout() {
        try {
            await fetch(ENDPOINTS.LOGOUT, {
                method: "GET",      
                credentials: "include", 
            });
        } catch (err) {
            console.warn("Backend logout failed:", err);
        } finally {
        
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("user");

            setIsAuthenticated(false);
            setUser(null);
        }
    }

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, user, loading, login, logout, }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
