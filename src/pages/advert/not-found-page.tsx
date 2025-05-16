import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/layout";
import { Button } from "../../components/Button";
import { useAuth } from "../auth/context";

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { isLogged } = useAuth();

  const handleClick = () => {
    navigate(isLogged ? "/adverts" : "/login", { replace: true });
  };

  return (
    <Layout title="">
      <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
        <h1 className="text-text mb-4 text-5xl font-bold dark:text-white">
          404
        </h1>
        <p className="text-text/70 mb-8 text-lg dark:text-white/70">
          Lo sentimos, la página que buscas no existe.
        </p>
        <Button
          type="button"
          text={isLogged ? "Volver al listado" : "Ir al login"}
          onClick={handleClick}
          classes="rounded bg-primary dark:bg-dark-primary px-6 py-2 text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>
    </Layout>
  );
}
