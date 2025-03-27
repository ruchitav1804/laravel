import React, { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ We need a loading state!

  // Check localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("USER");
    const storedToken = localStorage.getItem("TOKEN");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }

    setLoading(false); // ✅ Mark loading false after checking storage
  }, []);

  const login = async ({ email, password }) => {
    setLoading(true); // ✅ Start loading before sending request
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();

      // ✅ Set user & token after successful login
      setUser(data.user);
      setToken(data.token);

      // ✅ Save them in localStorage
      localStorage.setItem("USER", JSON.stringify(data.user));
      localStorage.setItem("TOKEN", data.token);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false); // ✅ Loading done whether success or fail
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("USER");
    localStorage.removeItem("TOKEN");
  };

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
