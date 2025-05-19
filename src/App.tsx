import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./pages/auth/context";
import LoginPage from "./pages/auth/login-page";
import RegisterPage from "./pages/register/register-page";
import NewAdvertPage from "./pages/advert/new-advert-page";
import AdvertsPage from "./pages/advert/adverts-page";
import NotFoundPage from "./pages/advert/not-found-page";
import AdvertPage from "./pages/advert/advert-page";
import Layout from "./components/layout/layout";
import type { ReactNode } from "react";

interface AuthRouteProps {
  children: ReactNode;
  requireAuth: boolean;
  redirectTo?: string;
}

const AuthRoute = ({ children, requireAuth, redirectTo }: AuthRouteProps) => {
  const { isLogged } = useAuth();
  const location = useLocation();

  const shouldAllow = requireAuth ? isLogged : !isLogged;
  const fallbackRoute = redirectTo ?? (requireAuth ? "/login" : "/adverts");

  return shouldAllow ? (
    children
  ) : (
    <Navigate to={fallbackRoute} replace state={{ from: location.pathname }} />
  );
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Layout />}>
        <Route
          index
          element={
            <AuthRoute requireAuth={false}>
              <LoginPage />
            </AuthRoute>
          }
        />
      </Route>
      <Route path="/register" element={<Layout />}>
        <Route
          index
          element={
            <AuthRoute requireAuth={false}>
              <RegisterPage />
            </AuthRoute>
          }
        />
      </Route>

      <Route path="/" element={<Navigate to="/adverts" replace />} />
      <Route path="/adverts" element={<Layout />}>
        <Route
          index
          element={
            <AuthRoute requireAuth={true}>
              <AdvertsPage />
            </AuthRoute>
          }
        />
        <Route
          path="new"
          element={
            <AuthRoute requireAuth={true}>
              <NewAdvertPage />
            </AuthRoute>
          }
        />
        <Route
          path=":id"
          element={
            <AuthRoute requireAuth={true}>
              <AdvertPage />
            </AuthRoute>
          }
        />
      </Route>

      <Route path="/not-found" element={<Layout />}>
        <Route index element={<NotFoundPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
}

export default App;
