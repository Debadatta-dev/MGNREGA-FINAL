// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/DashBoard";
import NotFound from "./pages/NotFound";

function Navigation() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      style={{
        backgroundColor: "#2c3e50",
        padding: "0",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        marginBottom: "20px",
        stickyPosition: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "60px",
        }}
      >
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "18px",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          title="Go to Home"
        >
          <span style={{ fontSize: "24px" }}>🏛️</span>
          MGNREGA
        </Link>

        <ul
          style={{
            listStyle: "none",
            display: "flex",
            gap: "0",
            margin: "0",
            padding: "0",
            height: "100%",
            alignItems: "center",
          }}
        >
          <li>
            <Link
              to="/"
              style={{
                color: isActive("/") ? "#3498db" : "white",
                textDecoration: "none",
                padding: "20px",
                display: "flex",
                alignItems: "center",
                height: "100%",
                transition: "background-color 0.3s ease, color 0.3s ease",
                backgroundColor: isActive("/")
                  ? "rgba(52, 152, 219, 0.1)"
                  : "transparent",
                borderBottom: isActive("/")
                  ? "3px solid #3498db"
                  : "3px solid transparent",
                fontWeight: isActive("/") ? "600" : "500",
              }}
              onMouseEnter={(e) => {
                if (!isActive("/")) {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.1)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive("/")) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              style={{
                color: isActive("/dashboard") ? "#3498db" : "white",
                textDecoration: "none",
                padding: "20px",
                display: "flex",
                alignItems: "center",
                height: "100%",
                transition: "background-color 0.3s ease, color 0.3s ease",
                backgroundColor: isActive("/dashboard")
                  ? "rgba(52, 152, 219, 0.1)"
                  : "transparent",
                borderBottom: isActive("/dashboard")
                  ? "3px solid #3498db"
                  : "3px solid transparent",
                fontWeight: isActive("/dashboard") ? "600" : "500",
              }}
              onMouseEnter={(e) => {
                if (!isActive("/dashboard")) {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.1)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive("/dashboard")) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
