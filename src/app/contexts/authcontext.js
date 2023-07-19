// AuthContext.js
"use client";
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState("");
  const [userType, setUserType] = useState("");

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        loggedInUserEmail,
        setLoggedInUserEmail,
        userType,
        setUserType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
