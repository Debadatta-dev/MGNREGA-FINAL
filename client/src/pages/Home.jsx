// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)",
          color: "white",
          padding: "60px 40px",
          borderRadius: "8px",
          marginBottom: "40px",
          textAlign: "center",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 style={{ fontSize: "48px", marginBottom: "16px", fontWeight: "bold" }}>
          🏛️ MGNREGA Dashboard
        </h1>
        <p style={{ fontSize: "18px", marginBottom: "30px", opacity: 0.9 }}>
          Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA) - District
          Performance Visualization
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "12px 30px",
            backgroundColor: "white",
            color: "#3498db",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "16px",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "none";
          }}
        >
          Access Dashboard →
        </button>
      </div>

      {/* Features Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        {/* Feature 1 */}
        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            borderTop: "4px solid #3498db",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
          }}
        >
          <h3 style={{ color: "#3498db", marginBottom: "12px" }}>
            📊 Smart Filtering
          </h3>
          <p style={{ color: "#7f8c8d", lineHeight: "1.6" }}>
            Filter and search district-wise data by state and district with real-time
            updates
          </p>
        </div>

        {/* Feature 2 */}
        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            borderTop: "4px solid #e74c3c",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
          }}
        >
          <h3 style={{ color: "#e74c3c", marginBottom: "12px" }}>
            📈 Performance Charts
          </h3>
          <p style={{ color: "#7f8c8d", lineHeight: "1.6" }}>
            Visualize performance metrics with interactive line and bar charts
          </p>
        </div>

        {/* Feature 3 */}
        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            borderTop: "4px solid #27ae60",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
          }}
        >
          <h3 style={{ color: "#27ae60", marginBottom: "12px" }}>
            📥 PDF Export
          </h3>
          <p style={{ color: "#7f8c8d", lineHeight: "1.6" }}>
            Export filtered data to professional PDF reports with formatting
          </p>
        </div>

        {/* Feature 4 */}
        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            borderTop: "4px solid #f39c12",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
          }}
        >
          <h3 style={{ color: "#f39c12", marginBottom: "12px" }}>
            🔄 Real-time Data
          </h3>
          <p style={{ color: "#7f8c8d", lineHeight: "1.6" }}>
            Access real-time updates from the official MGNREGA backend server
          </p>
        </div>

        {/* Feature 5 */}
        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            borderTop: "4px solid #9b59b6",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
          }}
        >
          <h3 style={{ color: "#9b59b6", marginBottom: "12px" }}>
            🌐 Responsive Design
          </h3>
          <p style={{ color: "#7f8c8d", lineHeight: "1.6" }}>
            Works seamlessly on desktop, tablet, and mobile devices
          </p>
        </div>

        {/* Feature 6 */}
        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            borderTop: "4px solid #1abc9c",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
          }}
        >
          <h3 style={{ color: "#1abc9c", marginBottom: "12px" }}>
            🔐 Secure & Fast
          </h3>
          <p style={{ color: "#7f8c8d", lineHeight: "1.6" }}>
            Built with modern technologies ensuring security and performance
          </p>
        </div>
      </div>

      {/* Info Section */}
      <div
        style={{
          backgroundColor: "#ecf0f1",
          padding: "30px",
          borderRadius: "8px",
          marginBottom: "40px",
        }}
      >
        <h2 style={{ marginBottom: "16px", color: "#2c3e50" }}>About MGNREGA</h2>
        <p style={{ color: "#7f8c8d", lineHeight: "1.8", marginBottom: "12px" }}>
          MGNREGA is a public works program that guarantees the right to work for rural
          citizens of India. It was enacted in 2005 and aims to enhance livelihood
          security and to reduce rural-urban migration.
        </p>
        <p style={{ color: "#7f8c8d", lineHeight: "1.8" }}>
          This dashboard provides comprehensive data visualization and analysis tools to
          track MGNREGA project performance across different districts in India.
        </p>
      </div>

      {/* CTA Section */}
      <div
        style={{
          backgroundColor: "#34495e",
          color: "white",
          padding: "40px",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "16px" }}>Ready to explore the data?</h2>
        <p style={{ marginBottom: "20px", opacity: 0.9 }}>
          Start filtering and analyzing MGNREGA project data by district
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "12px 30px",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "16px",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#2980b9";
            e.target.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#3498db";
            e.target.style.transform = "translateY(0)";
          }}
        >
          Go to Dashboard →
        </button>
      </div>
    </div>
  );
}
