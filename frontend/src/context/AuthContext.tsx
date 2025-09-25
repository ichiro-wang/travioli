import type { FilteredUser } from "@/api";
import { createContext, useContext } from "react";

interface AuthContextValue {
  user: FilteredUser;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext must be used in a ProtectedRoute");
  return { user: context.user };
};
