import { useState, type FormEvent, type ChangeEvent } from "react";
import { login } from "./service";
import { Button } from "../../components/Button";
import { useAuth } from "./context";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/layout";

export default function LoginPage() {
  const { onLogin } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const { email, password, remember } = credentials;
  const disabled = !email || !password;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [event.target.name]: event.target.value,
    }));
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await login({ email, password, remember });
      onLogin();
      navigate("/adverts", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout title="Iniciar sesión">
      <div className="bg-background flex min-h-screen items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm space-y-6 rounded bg-white p-8 shadow-md"
        >
          <h2 className="text-text text-center text-2xl font-semibold">
            Iniciar sesión
          </h2>

          <div>
            <label
              htmlFor="email"
              className="text-text block text-sm font-medium"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
              className="border-border text-text focus:border-primary focus:ring-primary mt-1 w-full rounded border px-3 py-2 text-sm focus:ring-1 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-text block text-sm font-medium"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
              className="border-border text-text focus:border-primary focus:ring-primary mt-1 w-full rounded border px-3 py-2 text-sm focus:ring-1 focus:outline-none"
            />
          </div>

          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              name="remember"
              checked={remember}
              onChange={(event) =>
                setCredentials({
                  email,
                  password,
                  remember: event.target.checked,
                })
              }
              className="border-border text-primary focus:ring-primary h-4 w-4 rounded"
            />
            <label htmlFor="remember" className="text-text ml-2 block text-sm">
              Recordarme
            </label>
          </div>

          <div>
            <Button
              text="Entrar"
              classes="w-full rounded bg-primary px-4 py-2 text-white hover:bg-primary/90 focus:ring-2 focus:ring-primary/50 focus:outline-none"
              type="submit"
              disabled={disabled}
            />
          </div>
        </form>
      </div>
    </Layout>
  );
}
