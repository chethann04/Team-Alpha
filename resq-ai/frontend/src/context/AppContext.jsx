import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('resq_user');
        return saved ? JSON.parse(saved) : null;
    });

    const [globalStats, setGlobalStats] = useState({
        mealsSaved: 48320,
        kgRescued: 19328,
        co2Prevented: 48320,
        ngosSupported: 142,
    });

    // Default notifications
    const [notifications, setNotifications] = useState([
        { id: 1, msg: 'Welcome to ResQ-AI!', type: 'info', read: false, date: new Date() },
        { id: 2, msg: 'New pickup nearby', type: 'success', read: false, date: new Date() },
    ]);

    const login = (userData) => {
        const userObj = {
            ...userData,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name}`
        };
        setUser(userObj);
        localStorage.setItem('resq_user', JSON.stringify(userObj));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('resq_user');
    };

    const updateUser = (newData) => {
        const updatedUser = { ...user, ...newData };
        setUser(updatedUser);
        localStorage.setItem('resq_user', JSON.stringify(updatedUser));
    };

    const addNotification = (msg, type = 'info') => {
        setNotifications((prev) => [
            { id: Date.now(), msg, type, read: false, date: new Date() },
            ...prev.slice(0, 9)
        ]);
    };

    return (
        <AppContext.Provider value={{
            user,
            login,
            logout,
            updateUser,
            globalStats,
            setGlobalStats,
            notifications,
            setNotifications,
            addNotification
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);