import { useState, type ReactNode } from "react";
import { AuthContext } from "./context";

interface AuthProviderProps {
  readonly defaultIsLogged: boolean;
  readonly children: ReactNode;
}

function AuthProvider({ defaultIsLogged, children }: AuthProviderProps) {
  const [isLogged, setIsLogged] = useState(defaultIsLogged);
  function handleLogin() {
    setIsLogged(true);
  }

  function handleLogout() {
    setIsLogged(false);
  }

  const authValue = { isLogged, onLogin: handleLogin, onLogout: handleLogout };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
