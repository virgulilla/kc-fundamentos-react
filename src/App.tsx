import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./pages/auth/context";
import RegisterPage from "./pages/register/register-page";
import NewAdvertPage from "./pages/advert/new-advert-page";
import AdvertsPage from "./pages/advert/adverts-page";
import NotFoundPage from "./pages/advert/not-found-page";
import AdvertPage from "./pages/advert/advert-page";
import Layout from "./components/layout/layout";
import { Suspense, lazy, type ReactNode } from "react";
const LoginPage = lazy(() => import("./pages/auth/login-page"));

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

function LoginSkeleton() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm animate-pulse space-y-6 rounded bg-white p-8 shadow-md">
        <div className="mx-auto h-6 w-32 rounded bg-gray-300" />

        <div className="h-10 w-full rounded border bg-red-100" />

        <div className="space-y-2">
          <div className="h-4 w-32 rounded bg-gray-300" />
          <div className="h-10 w-full rounded bg-gray-300" />
        </div>

        <div className="space-y-2">
          <div className="h-4 w-24 rounded bg-gray-300" />
          <div className="h-10 w-full rounded bg-gray-300" />
        </div>

        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 rounded bg-gray-300" />
          <div className="h-4 w-24 rounded bg-gray-300" />
        </div>

        <div className="h-10 w-full rounded bg-gray-300" />
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Layout />}>
        <Route
          index
          element={
            <AuthRoute requireAuth={false}>
              <Suspense fallback={<LoginSkeleton />}>
                <LoginPage />
              </Suspense>
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
