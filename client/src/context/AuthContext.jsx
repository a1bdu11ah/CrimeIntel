import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("crms_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (email, password) => {
    if (email === "admin@crms.gov.in" && password === "Admin@123") {
      const userData = { email, name: "DSP Harpreet Kaur", role: "Admin", badge: "CHD-001" };
      localStorage.setItem("crms_user", JSON.stringify(userData));
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("crms_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
