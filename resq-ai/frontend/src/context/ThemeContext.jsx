import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem('resqai-theme') === 'dark';
    });

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add('dark');
            document.body.style.backgroundColor = '#0b0f19';
        } else {
            root.classList.remove('dark');
            document.body.style.backgroundColor = '#f4f6f8';
        }
        localStorage.setItem('resqai-theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    return (
        <ThemeContext.Provider value={{ isDark, setIsDark }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);