import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    user: null
  });

  // Function to log in the user and store user data
  const login = (userData) => {
    setAuthState({ isLoggedIn: true, user: userData });
  };

  // Function to log out the user
  const logout = () => {
    setAuthState({ isLoggedIn: false, user: null });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
