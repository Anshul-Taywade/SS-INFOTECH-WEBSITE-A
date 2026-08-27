'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AdminThemeContext = createContext();

export function AdminThemeProvider({ children }) {
  // Light mode (false) by default like the website!
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <AdminThemeContext.Provider value={{ 
      isDarkMode, 
      setIsDarkMode, 
      toggleTheme,
      userModalOpen,
      setUserModalOpen
    }}>
      <div className={isDarkMode ? 'dark-admin' : 'light-admin'}>
        {children}
      </div>
    </AdminThemeContext.Provider>
  );
}

export function useAdminTheme() {
  const context = useContext(AdminThemeContext);
  if (!context) {
    throw new Error('useAdminTheme must be used within AdminThemeProvider');
  }
  return context;
}
