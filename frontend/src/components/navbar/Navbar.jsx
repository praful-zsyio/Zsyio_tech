import React, { useState, useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
const logo = "https://res.cloudinary.com/damlvqiwv/image/upload/f_auto,q_auto/v1769755031/static_assets/nhbcbfzk97vmxx0oxfa9.png";
import { useTheme } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useContext(AuthContext);
  const { globalData } = useData();
  const navLinks = globalData?.navLinks || [];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkBaseClasses =
    "relative px-3 py-2 text-sm font-medium transition-colors duration-200";

  const linkInactiveClasses = [
    theme === "light"
      ? "text-[hsl(var(--subtext1))]"
      : "text-[hsl(var(--subtext0))]",
    "hover:text-[hsl(var(--text))]",
  ].join(" ");

  const linkActiveClasses =
    "text-[hsl(var(--text))] after:absolute after:left-3 after:right-3 after:-bottom-1 after:h-[2px] after:rounded-full after:bg-[hsl(var(--blue))]";

  const handleToggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-40 flex justify-center pointer-events-none">
      <div className="w-full max-w-6xl px-4 sm:px-6 mt-4 pointer-events-auto">
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
          <Link to="/" className="flex items-center gap-2 select-none">
            <img className="h-10 w-auto" src={logo} alt="Zsyio logo" />
            <span className="text-xl font-serif font-bold tracking-tight uppercase text-[hsl(var(--text))]">
              Zsyio
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  [
                    linkBaseClasses,
                    isActive ? linkActiveClasses : linkInactiveClasses,
                  ].join(" ")
                }
                onClick={closeMenu}
              >
                {link.title}
              </NavLink>
            ))}

            {/* Desktop Contact CTA */}
            <Link
              to="/contact"
              className="
                ml-2 inline-flex items-center
                rounded-full px-4 py-2 text-sm font-semibold
                bg-[hsl(var(--blue))]
                text-[hsl(var(--base))]
                hover:bg-[hsl(var(--sapphire))]
                transition-colors
                shadow-soft
              "
            >
              Contact Us
            </Link>




          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              aria-pressed={theme === "dark"}
              className="
                relative h-8 w-14 overflow-hidden rounded-full
                border border-[hsl(var(--overlay1))/0.7]
                bg-[hsl(var(--surface0)/0.7)]
                backdrop-blur-xl
                shadow-[0_4px_10px_rgba(0,0,0,0.18)]
              "
            >
              <span
                className={`absolute inset-0 transition-transform duration-500 ${theme === "dark"
                  ? "translate-y-0 bg-[hsl(var(--yellow)/0.3)]"
                  : "-translate-y-full bg-[hsl(var(--blue)/0.35)]"
                  }`}
              />

              <span
                className={`absolute left-2 top-1/2 -translate-y-1/2 transition-all duration-500 ${theme === "dark"
                  ? "-translate-x-10 opacity-0"
                  : "translate-x-0 opacity-100"
                  }`}
              >
                ☀️
              </span>

              <span
                className={`absolute right-2 top-1/2 -translate-y-1/2 transition-all duration-500 ${theme === "dark"
                  ? "translate-x-0 opacity-100"
                  : "translate-x-10 opacity-0"
                  }`}
              >
                🌙
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={handleToggleMenu}
              className="
                md:hidden inline-flex h-9 w-9 items-center justify-center
                rounded-full border border-[hsl(var(--overlay1))/0.7]
                bg-[hsl(var(--surface0)/0.7)]
                backdrop-blur-xl
                text-[hsl(var(--text))]
              "
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              <span className="relative block h-4 w-4">
                <span
                  className={`absolute left-0 top-0 h-[2px] w-full rounded-full bg-current transition-transform duration-200 ${isMenuOpen ? "translate-y-[6px] rotate-45" : ""
                    }`}
                />
                <span
                  className={`absolute left-0 top-[6px] h-[2px] w-full rounded-full bg-current transition-opacity duration-200 ${isMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                />
                <span
                  className={`absolute left-0 top-[12px] h-[2px] w-full rounded-full bg-current transition-transform duration-200 ${isMenuOpen ? "-translate-y-[6px] -rotate-45" : ""
                    }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 pb-1">
            <div
              className="
                flex flex-col gap-1 rounded-2xl
                border border-[hsl(var(--surface2))/0.7]
                bg-[hsl(var(--mantle)/0.45)]
                backdrop-blur-xl
                p-2 shadow-[0_10px_24px_rgba(0,0,0,0.18)]
              "
            >
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    [
                      "rounded-lg px-3 py-2 text-sm transition-colors duration-200",
                      isActive
                        ? "bg-[hsl(var(--surface1))] text-[hsl(var(--text))]"
                        : `${theme === "light"
                          ? "text-[hsl(var(--subtext1))]"
                          : "text-[hsl(var(--subtext0))]"
                        } hover:text-[hsl(var(--text))] hover:bg-[hsl(var(--surface1)/0.7)]`,
                    ].join(" ")
                  }
                  onClick={closeMenu}
                >
                  {link.title}
                </NavLink>
              ))}

              {/* Mobile Contact CTA */}
              <Link
                to="/contact"
                onClick={closeMenu}
                className="
                  mt-2 rounded-xl px-3 py-2 text-sm font-semibold text-center
                  bg-[hsl(var(--blue))]
                  text-[hsl(var(--base))]
                  hover:bg-[hsl(var(--sapphire))]
                  transition-colors
                "
              >
                Contact Us
              </Link>


            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
