import React, { createContext, useState, useEffect } from "react";
import API from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Error parsing stored user data", err);
      }
    }
    setLoading(false);
  }, []);


  const login = async (email, password) => {
    const response = await API.post("/auth/login", { email, password });
    const { token: userToken, ...userData } = response.data.data;

    setToken(userToken);
    setUser(userData);

    localStorage.setItem("token", userToken);
    localStorage.setItem("user", JSON.stringify(userData));

    return response.data;
  };

  const register = async (name, email, password) => {
    const response = await API.post("/auth/register", {name, email,password,});
    const { token: userToken, ...userData } = response.data.data;

    setToken(userToken);
    setUser(userData);

    localStorage.setItem("token", userToken);
    localStorage.setItem("user", JSON.stringify(userData));

    return response.data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const updateUserData = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        updateUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
