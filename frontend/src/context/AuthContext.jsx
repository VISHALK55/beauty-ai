import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Bypass login per user request
    const token = 'bypassed-token';
    const userRole = 'SUPER_ADMIN';
    const salonId = 'pihu-makeover';

    const login = (newToken, role, id) => {
        // Ignored
    };

    const logout = () => {
        // Ignored
    };

    return (
        <AuthContext.Provider value={{ token, userRole, salonId, login, logout, isAuthenticated: true }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
