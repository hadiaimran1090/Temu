import React, { createContext, useContext } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { setAuth, clearAuth } from "../store/slices/authSlice";

interface AuthContextType {
  token: string | null;
  userEmail: string | null;
  login: (email: string, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const token = useAppSelector((state) => state.auth.token);
  const userEmail = useAppSelector((state) => state.auth.userEmail);
  const dispatch = useAppDispatch();

  const login = (email: string, token: string) => {
    dispatch(setAuth({ email, token }));
  };

  const logout = () => {
    dispatch(clearAuth());
  };

  return (
    <AuthContext.Provider value={{ token, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
