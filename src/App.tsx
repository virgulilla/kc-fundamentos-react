import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useAuth } from "./pages/auth/context";
import LoginPage from "./pages/auth/login-page";
import RegisterPage from "./pages/register/register-page";
import NewAdvertPage from "./pages/advert/new-advert-page";
import AdvertsPage from "./pages/advert/adverts-page";
import NotFoundPage from "./pages/advert/not-found-page";
import AdvertPage from "./pages/advert/advert-page";
import Layout from "./components/layout/layout";
import type { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isLogged } = useAuth();
  const location = useLocation();
  return isLogged ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location.pathname }} />
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Layout />}>
          <Route index element={<LoginPage />} />
        </Route>
        <Route path="/register" element={<Layout />}>
          <Route index element={<RegisterPage />} />
        </Route>

        <Route path="/" element={<Navigate to="/adverts" replace />} />
        <Route path="/adverts" element={<Layout />}>
          <Route
            index
            element={
              <PrivateRoute>
                <AdvertsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="new"
            element={
              <PrivateRoute>
                <NewAdvertPage />
              </PrivateRoute>
            }
          />
          <Route
            path=":id"
            element={
              <PrivateRoute>
                <AdvertPage />
              </PrivateRoute>
            }
          />
        </Route>

        <Route path="/not-found" element={<Layout />}>
          <Route index element={<NotFoundPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </Router>
  );
}

export default App;
