import React from "react";
import AuthProvider, { AuthContext } from "./AuthProvider";

export interface StoreProviderProps {
  children: React.ReactNode;
}

export default function StoreProvider({ children }: StoreProviderProps) {
  return <AuthProvider>{children}</AuthProvider>;
}

export { AuthContext };
