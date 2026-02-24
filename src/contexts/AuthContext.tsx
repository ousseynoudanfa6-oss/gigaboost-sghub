import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  email: string;
  id: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("gb_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const register = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("gb_users") || "[]");
    if (users.find((u: any) => u.email === email)) return false;
    const newUser = { email, password, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem("gb_users", JSON.stringify(users));
    const { password: _, ...safeUser } = newUser;
    localStorage.setItem("gb_user", JSON.stringify(safeUser));
    setUser(safeUser);
    return true;
  };

  const login = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("gb_users") || "[]");
    const found = users.find((u: any) => u.email === email && u.password === password);
    if (!found) return false;
    const { password: _, ...safeUser } = found;
    localStorage.setItem("gb_user", JSON.stringify(safeUser));
    setUser(safeUser);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("gb_user");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
};
