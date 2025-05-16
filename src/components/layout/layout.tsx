import type { ReactNode } from "react";
import Header from "./header";
import Footer from "./footer";
import Sidebar from "./Sidebar";
import { useAuth } from "../../pages/auth/context";

interface LayoutProps {
  readonly title: string;
  readonly children: ReactNode;
}

export default function Layout({ title, children }: LayoutProps) {
  const { isLogged } = useAuth();

  return (
    <div className="bg-background text-text dark:bg-dark-background font-inter flex min-h-screen flex-col">
      <Header />

      <div className="flex flex-grow">
        {isLogged && <Sidebar />}

        <main className="flex-grow overflow-y-auto px-4 py-6 sm:px-6 sm:py-8">
          <div className="mx-auto w-full max-w-screen-xl">
            <h1 className="mb-4 text-2xl font-semibold sm:text-3xl dark:text-white">
              {title}
            </h1>
            <section className="dark:bg-dark-background w-full overflow-x-auto rounded bg-white p-4 shadow-sm sm:p-6">
              {children}
            </section>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
