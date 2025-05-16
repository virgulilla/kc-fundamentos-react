import { useState } from "react";
import { NavLink } from "react-router-dom";
import Icon, { type IconName } from "../icon";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navItems: { to: string; label: string; icon: IconName }[] = [
    { to: "/adverts", label: "Ver anuncios", icon: "eye" },
    { to: "/adverts/new", label: "Nuevo anuncio", icon: "edit" },
  ];

  return (
    <aside
      className={`bg-background border-border dark:bg-dark-background dark:border-dark-border flex h-screen flex-col border-r shadow-sm transition-all duration-300 ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      <div className="border-border dark:border-dark-border flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <Icon name="logo" className="h-5 w-5" />
          {!collapsed && (
            <span className="text-text dark:text-dark-text font-bold">
              Nodepop
            </span>
          )}
        </div>

        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="text-text hover:text-primary dark:text-dark-text dark:hover:text-dark-primary"
        >
          <Icon name="menu" className="h-5 w-5" />
        </button>
      </div>

      <nav className="mt-4 flex flex-col space-y-2 px-2">
        {navItems.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/adverts"}
            title={label}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary dark:bg-dark-primary text-white"
                  : "text-text hover:bg-background hover:text-primary dark:text-dark-text dark:hover:bg-dark-background dark:hover:text-dark-primary"
              }`
            }
          >
            <Icon name={icon} className="h-5 w-5 shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
