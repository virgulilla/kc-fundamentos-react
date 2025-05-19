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
import Layout from "./components/layout/layout";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLogged } = useAuth();
  return isLogged ? children : <Navigate to="/login" replace />;
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
