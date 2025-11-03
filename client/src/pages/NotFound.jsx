// src/pages/NotFound.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <div
        style={{
          backgroundColor: "white",
          padding: "80px 20px",
          borderRadius: "8px",
          textAlign: "center",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ fontSize: "64px", marginBottom: "20px" }}>🔍</div>
        <h1 style={{ fontSize: "48px", color: "#e74c3c", marginBottom: "16px" }}>
          404
        </h1>
        <h2 style={{ color: "#2c3e50", marginBottom: "12px" }}>
          Page Not Found
        </h2>
        <p
          style={{
            color: "#7f8c8d",
            marginBottom: "30px",
            fontSize: "16px",
            lineHeight: "1.6",
          }}
        >
          Sorry, the page you're looking for doesn't exist or has been moved.
          <br />
          Please navigate using the menu or go back to the home page.
        </p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              padding: "12px 24px",
              backgroundColor: "#3498db",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "500",
              fontSize: "14px",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#2980b9")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#3498db")}
          >
            ← Go to Home
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            style={{
              padding: "12px 24px",
              backgroundColor: "#27ae60",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "500",
              fontSize: "14px",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#229954")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#27ae60")}
          >
            Go to Dashboard →
          </button>
        </div>
      </div>
    </div>
  );
}
