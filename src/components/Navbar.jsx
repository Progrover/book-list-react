import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

function Navbar({ favoritesCount }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-logo">
          <span>📚</span> BookShelf
        </NavLink>

        <div className="navbar-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            🔍 Discover
          </NavLink>

          <NavLink
            to="/my-books"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            📖 My Books
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            ❤️ Favorites{favoritesCount > 0 ? ` (${favoritesCount})` : ""}
          </NavLink>

          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
