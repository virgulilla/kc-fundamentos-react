import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./pages/auth/context";
import LoginPage from "./pages/auth/login-page";
import RegisterPage from "./pages/register/register-page";
import NewAdvertPage from "./pages/advert/new-advert-page";
import AdvertsPage from "./pages/advert/adverts-page";
import NotFoundPage from "./pages/advert/not-found-page";
import AdvertPage from "./pages/advert/advert-page";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLogged } = useAuth();
  return isLogged ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/" element={<Navigate to="/adverts" replace />} />
        <Route
          path="/adverts"
          element={
            <PrivateRoute>
              <AdvertsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/adverts/new"
          element={
            <PrivateRoute>
              <NewAdvertPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/adverts/:id"
          element={
            <PrivateRoute>
              <AdvertPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
