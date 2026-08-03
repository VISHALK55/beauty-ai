import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('jwt_token'));
    const [userRole, setUserRole] = useState(localStorage.getItem('user_role'));
    const [salonId, setSalonId] = useState(localStorage.getItem('salon_id'));

    const login = (newToken, role, id) => {
        setToken(newToken);
        setUserRole(role);
        setSalonId(id);
        localStorage.setItem('jwt_token', newToken);
        if (role) localStorage.setItem('user_role', role);
        if (id) localStorage.setItem('salon_id', id);
    };

    const logout = () => {
        setToken(null);
        setUserRole(null);
        setSalonId(null);
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user_role');
        localStorage.removeItem('salon_id');
    };

    return (
        <AuthContext.Provider value={{ token, userRole, salonId, login, logout, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
