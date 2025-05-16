import type { FormEvent } from "react";
import { useState } from "react";
import { register } from "./service";
import { Button } from "../../components/Button";
import Layout from "../../components/layout/layout";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      await register({
        email: formData.get("email") as string,
        password,
        username: formData.get("username") as string,
        name: formData.get("name") as string,
      });
      // Aquí podrías redirigir al login o mostrar mensaje de éxito
    } catch (error) {
      console.error(error);
      setError("Error al registrar el usuario.");
    }
  };

  return (
    <Layout title="Crear cuenta">
      <div className="bg-background flex min-h-screen items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm space-y-6 rounded bg-white p-8 shadow-md"
        >
          <h2 className="text-text text-center text-2xl font-semibold">
            Registrar cuenta
          </h2>
          <div>
            <label
              htmlFor="name"
              className="text-text block text-sm font-medium"
            >
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="border-border text-text focus:border-primary focus:ring-primary mt-1 w-full rounded border px-3 py-2 text-sm focus:ring-1 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="username"
              className="text-text block text-sm font-medium"
            >
              Usuario
            </label>
            <input
              id="username"
              name="username"
              defaultValue="oscar"
              type="text"
              required
              className="border-border text-text focus:border-primary focus:ring-primary mt-1 w-full rounded border px-3 py-2 text-sm focus:ring-1 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-text block text-sm font-medium"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
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
              name="password"
              type="password"
              required
              className="border-border text-text focus:border-primary focus:ring-primary mt-1 w-full rounded border px-3 py-2 text-sm focus:ring-1 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="text-text block text-sm font-medium"
            >
              Confirmar contraseña
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="border-border text-text focus:border-primary focus:ring-primary mt-1 w-full rounded border px-3 py-2 text-sm focus:ring-1 focus:outline-none"
            />
          </div>

          {error && <p className="text-danger text-center text-sm">{error}</p>}

          <div>
            <Button
              text="Crear cuenta"
              classes="w-full rounded bg-primary px-4 py-2 text-white hover:bg-primary/90 focus:ring-2 focus:ring-primary/50 focus:outline-none"
              type="submit"
            />
          </div>
        </form>
      </div>
    </Layout>
  );
}
