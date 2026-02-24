import React, { useState, useContext } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
const logo = "https://res.cloudinary.com/damlvqiwv/image/upload/f_auto,q_auto/v1769755031/static_assets/nhbcbfzk97vmxx0oxfa9.png";
import { useTheme } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import * as LucideIcons from "lucide-react";
import { getIcon } from "../../utils/iconMap";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useContext(AuthContext);
  const { globalData } = useData();
  const navigate = useNavigate();
  const location = useLocation();
  const navLinks = globalData?.navLinks || [];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkBaseClasses =
    "relative px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-1";

  const linkInactiveClasses = [
    theme === "light"
      ? "text-[hsl(var(--subtext1))]"
      : "text-[hsl(var(--subtext0))]",
    "hover:text-[hsl(var(--text))]",
  ].join(" ");

  const linkActiveClasses =
    "text-[hsl(var(--text))] after:absolute after:left-3 after:right-3 after:-bottom-1 after:h-[2px] after:rounded-full after:bg-[hsl(var(--blue))]";

  const handleToggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    closeMenu();
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-40 flex justify-center pointer-events-none">
      <div className="w-full max-w-7xl px-4 sm:px-6 mt-4 pointer-events-auto">
        <div
          className="
            relative flex h-14 md:h-16 items-center justify-between gap-4
            rounded-3xl
            border border-[hsl(var(--surface2))/0.7]
            bg-[hsl(var(--mantle)/0.35)]
            backdrop-blur-2xl
            shadow-[0_10px_30px_rgba(0,0,0,0.18)]
            px-4 sm:px-6
          "
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 select-none" onClick={closeMenu}>
            <img className="h-10 w-auto" src={logo} alt="Zsyio logo" />
            <div className="flex flex-col">
              <span className="text-xl font-serif font-bold tracking-tight uppercase text-[hsl(var(--text))] hidden sm:block leading-none">
                Zsyio
              </span>
              <span className="items-center gap-1 text-[8px] uppercase tracking-widest text-[hsl(var(--green))] font-bold hidden sm:flex">
                <span className="h-1 w-1 rounded-full bg-[hsl(var(--green))] animate-pulse" />
                Live
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = getIcon(link.icon, link.title);

              return (
                <NavLink
                  key={link.title}
                  to={link.hash ? `${link.path}#${link.hash}` : link.path}
                  className={({ isActive }) =>
                    [
                      linkBaseClasses,
                      isActive && !link.hash ? linkActiveClasses : linkInactiveClasses,
                    ].join(" ")
                  }
                  onClick={closeMenu}
                >
                  <Icon className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                  {link.title}
                </NavLink>
              );
            })}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="
                relative h-8 w-14 overflow-hidden rounded-full
                border border-[hsl(var(--overlay1))/0.7]
                bg-[hsl(var(--surface0)/0.7)]
                backdrop-blur-xl
              "
            >
              <span className={`absolute inset-0 transition-transform duration-500 ${theme === "dark" ? "translate-y-0 bg-[hsl(var(--yellow)/0.3)]" : "-translate-y-full bg-[hsl(var(--blue)/0.35)]"}`} />
              <span className={`absolute left-2 top-1/2 -translate-y-1/2 transition-all duration-500 ${theme === "dark" ? "-translate-x-10 opacity-0" : "translate-x-0 opacity-100"}`}>☀️</span>
              <span className={`absolute right-2 top-1/2 -translate-y-1/2 transition-all duration-500 ${theme === "dark" ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}>🌙</span>
            </button>

            {/* Auth/Profile */}
            <div className="hidden sm:block">
              {user?.isAuthenticated && (
                <div className="flex items-center gap-2">
                  <a href="http://localhost:8000/admin/" target="_blank" rel="noopener noreferrer" className="p-2 text-[hsl(var(--subtext1))] hover:text-[hsl(var(--text))] transition-colors" title="Admin Dashboard">
                    <LucideIcons.LayoutDashboard className="w-5 h-5" />
                  </a>
                  <button onClick={handleLogout} className="flex items-center gap-1 text-sm font-medium text-[hsl(var(--red))] hover:opacity-80 transition-opacity">
                    <LucideIcons.LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={handleToggleMenu}
              className="
                md:hidden inline-flex h-9 w-9 items-center justify-center
                rounded-full border border-[hsl(var(--overlay1))/0.7]
                bg-[hsl(var(--surface0)/0.7)]
                text-[hsl(var(--text))]
              "
              aria-expanded={isMenuOpen}
            >
              <span className="relative block h-4 w-4">
                <span className={`absolute left-0 top-0 h-[2px] w-full rounded-full bg-current transition-all duration-200 ${isMenuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
                <span className={`absolute left-0 top-[6px] h-[2px] w-full rounded-full bg-current transition-opacity duration-200 ${isMenuOpen ? "opacity-0" : "opacity-100"}`} />
                <span className={`absolute left-0 top-[12px] h-[2px] w-full rounded-full bg-current transition-all duration-200 ${isMenuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 pb-1">
            <div className="flex flex-col gap-1 rounded-2xl border border-[hsl(var(--surface2))/0.7] bg-[hsl(var(--mantle)/0.45)] backdrop-blur-xl p-2 shadow-2xl">
              {navLinks.map((link) => {
                const Icon = getIcon(link.icon, link.title);

                return (
                  <NavLink
                    key={link.title}
                    to={link.path}
                    className={({ isActive }) =>
                      [
                        "rounded-lg px-3 py-2 text-sm transition-colors duration-200 flex items-center gap-3",
                        isActive ? "bg-[hsl(var(--surface1))] text-[hsl(var(--text))]" : "text-[hsl(var(--subtext1))] hover:text-[hsl(var(--text))]"
                      ].join(" ")
                    }
                    onClick={closeMenu}
                  >
                    <Icon className="w-4 h-4" />
                    {link.title}
                  </NavLink>
                );
              })}

              <div className="h-px bg-[hsl(var(--surface1))] my-1" />

              {user?.isAuthenticated && (
                <>
                  <a href="http://localhost:8000/admin/" className="px-3 py-2 text-sm text-[hsl(var(--subtext1))] flex items-center gap-2">
                    <LucideIcons.LayoutDashboard className="w-4 h-4" /> Admin Panel
                  </a>
                  <button onClick={handleLogout} className="px-3 py-2 text-sm text-[hsl(var(--red))] flex items-center gap-2 text-left">
                    <LucideIcons.LogOut className="w-4 h-4" /> Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
