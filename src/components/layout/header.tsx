import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logout } from "../../pages/auth/service";
import Icon from "../icon";
import { ConfirmModal } from "../../components/ConfirmModal";
import { useAuth, useLogoutAction } from "../../store/hooks";

function Header() {
  const isLogged = useAuth();
  const logoutAction = useLogoutAction;
  const [darkMode, setDarkMode] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const toggleTheme = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleLogout = async () => {
    await logout();
    logoutAction();
    document.documentElement.classList.remove("dark");
    setIsConfirmOpen(false);
    navigate("/login", { replace: true });
  };

  const goToLogin = () => navigate("/login");
  const goToRegister = () => navigate("/register");

  const path = location.pathname;
  const isLogin = path === "/login";
  const isRegister = path === "/register";

  const baseButtonClass =
    "rounded px-4 py-2 text-white focus:outline-none focus:ring-2 transition";

  return (
    <header className="border-boder dark:border-dark-border bg-background dark:bg-dark-background dark:text-dark-text border-b shadow-md">
      <div className="mx-auto flex max-w-6xl items-end px-4 py-3">
        <nav className="ml-auto flex items-center gap-4">
          {isLogged && (
            <button
              onClick={toggleTheme}
              className="text-text dark:text-dark-text hover:text-primary dark:hover:text-dark-primary p-2 focus:outline-none"
              aria-label="Toggle dark mode"
            >
              <Icon name={darkMode ? "light" : "dark"} className="h-6 w-6" />
            </button>
          )}

          {isLogged ? (
            <button
              onClick={() => setIsConfirmOpen(true)}
              className={`${baseButtonClass} bg-danger hover:bg-danger/90 dark:bg-dark-danger dark:hover:bg-dark-danger/90 focus:ring-danger/50`}
            >
              Logout
            </button>
          ) : isLogin ? (
            <button
              onClick={goToRegister}
              className={`${baseButtonClass} bg-primary hover:bg-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 focus:ring-primary/50`}
            >
              ¿No tienes cuenta? Regístrate
            </button>
          ) : isRegister ? (
            <button
              onClick={goToLogin}
              className={`${baseButtonClass} bg-primary hover:bg-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 focus:ring-primary/50`}
            >
              ¿Ya tienes cuenta? Inicia sesión
            </button>
          ) : (
            <button
              onClick={goToLogin}
              className={`${baseButtonClass} bg-primary hover:bg-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 focus:ring-primary/50`}
            >
              Login
            </button>
          )}
        </nav>
      </div>
      {isConfirmOpen && (
        <ConfirmModal
          title="Cerrar sesion"
          message="¿Estás seguro de que deseas cerrar tu sesion de usuario?."
          onConfirm={handleLogout}
          onCancel={() => setIsConfirmOpen(false)}
          buttonText="Cerrar sesión"
        />
      )}
    </header>
  );
}

export default Header;
