import Header from "./header";
import Footer from "./footer";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../store/hooks";

export default function Layout() {
  const isLogged = useAuth()

  return (
    <div className="bg-background text-text dark:bg-dark-background font-inter flex min-h-screen flex-col">
      <Header />

      <div className="flex flex-grow">
        {isLogged && <Sidebar />}

        <main className="flex-grow overflow-y-auto px-4 py-6 sm:px-6 sm:py-8">
          <div className="mx-auto w-full max-w-screen-xl">
            <section className="dark:bg-dark-background w-full overflow-x-auto rounded bg-white p-4 shadow-sm sm:p-6">
              <Outlet />
            </section>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
