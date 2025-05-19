import { useState, type FormEvent, type ChangeEvent } from "react";
import { login } from "./service";
import { Button } from "../../components/Button";
import { useAuth } from "./context";
import { useLocation, useNavigate } from "react-router-dom";
import Page from "../../components/layout/page";
import { AxiosError } from "axios";

export default function LoginPage() {
  const location = useLocation();
  const { onLogin } = useAuth();
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [error, setError] = useState<{ message: string } | null>(null);
  const { email, password, remember } = credentials;
  const disabled = !email || !password || isFetching;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [event.target.name]: event.target.value,
    }));
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsFetching(true);
      await login({ email, password, remember });
      onLogin();
      const to = location.state?.from ?? "/";
      navigate(to, { replace: true });
    } catch (error) {
      if (error instanceof AxiosError) {
        setError({ message: error.response?.data.message });
      }
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <Page title="">
      <div className="bg-background flex min-h-screen items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm space-y-6 rounded bg-white p-8 shadow-md"
        >
          <h2 className="text-text text-center text-2xl font-semibold">
            Iniciar sesión
          </h2>

          {error && (
            <div
              className="rounded border border-red-200 bg-red-50 px-3 py-2 text-center text-sm text-red-600"
              role="alert"
              onClick={() => setError(null)}
            >
              {error.message}
            </div>
          )}

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
    </Page>
  );
}
