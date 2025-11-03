// src/pages/Dashboard.jsx
import React, { useCallback, useEffect, useState } from "react";
import Filters from "../components/Filters";
import DataTable from "../components/DataTable";
import Chart from "../components/Chart";
import ExportPDF from "../components/ExportPDF";

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://mgnrega-final-1-eaft.onrender.com";

export default function DashBoard() {
  const [selected, setSelected] = useState({ state: "", district: "" });
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalRecords, setTotalRecords] = useState(0);

  const handleFilterChange = useCallback(({ state, district }) => {
    setSelected({ state, district });
    setPage(0);
  }, []);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams();
        params.set("limit", rowsPerPage);
        params.set("offset", page * rowsPerPage);
        if (selected.state) params.set("state", selected.state);
        if (selected.district) params.set("district", selected.district);

        const url = `${BASE_URL}/api/data?${params.toString()}`;
        const res = await fetch(url);
        const json = await res.json();

        if (!res.ok) {
          console.error("API responded with error:", json);
          setError(json.error || "API returned an error");
          setData([]);
          setTotalRecords(0);
        } else {
          const records = json.records ?? json;
          if (Array.isArray(records)) {
            setData(records);
            setTotalRecords(json.total || records.length);
          } else {
            setData([]);
            setTotalRecords(0);
          }
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load data (network or server error)");
        setData([]);
        setTotalRecords(0);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [selected, page]);

  const handlePrevPage = () => {
    setPage((p) => Math.max(0, p - 1));
  };

  const handleNextPage = () => {
    if (data.length === rowsPerPage) {
      setPage((p) => p + 1);
    }
  };

  const canGoNext = data.length === rowsPerPage;

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      {/* Header */}
      <div style={{ marginBottom: "30px" }}>
        <h1 style={{ marginBottom: "8px", color: "#2c3e50" }}>
          📊 MGNREGA Dashboard
        </h1>
        <p style={{ color: "#7f8c8d" }}>
          Explore district-wise performance metrics and data visualization
        </p>
      </div>

      {/* Filters Card */}
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "30px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          borderTop: "4px solid #3498db",
        }}
      >
        <h2 style={{ marginBottom: "16px", fontSize: "18px", color: "#2c3e50" }}>
          Filters
        </h2>
        <Filters onChange={handleFilterChange} baseUrl={BASE_URL} />
      </div>

      {/* Loading State */}
      {loading && (
        <div
          style={{
            backgroundColor: "#d6eaf8",
            color: "#2c5aa0",
            padding: "16px",
            borderRadius: "4px",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span style={{ fontSize: "18px" }}>⏳</span>
          <span>Loading data...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div
          style={{
            backgroundColor: "#fadbd8",
            color: "#922b21",
            padding: "16px",
            borderRadius: "4px",
            marginBottom: "20px",
            borderLeft: "4px solid #c0392b",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span style={{ fontSize: "18px" }}>❌</span>
          <span>{error}</span>
        </div>
      )}

      {/* Charts Section */}
      {!loading && !error && data.length > 0 && (
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "30px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 style={{ marginBottom: "20px", fontSize: "18px", color: "#2c3e50" }}>
            Performance Visualization
          </h2>
          <Chart records={data} />
        </div>
      )}

      {/* Data Table Section */}
      {!loading && !error && data.length > 0 && (
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "30px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <h2 style={{ fontSize: "18px", color: "#2c3e50", margin: 0 }}>
              District Data
            </h2>
            <ExportPDF data={data} />
          </div>
          <DataTable data={data} />
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && data.length === 0 && (
        <div
          style={{
            backgroundColor: "white",
            padding: "60px 20px",
            borderRadius: "8px",
            marginBottom: "30px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            color: "#7f8c8d",
          }}
        >
          <p style={{ fontSize: "48px", margin: "0 0 16px 0" }}>📭</p>
          <p style={{ fontSize: "16px", margin: "0 0 8px 0", fontWeight: "500" }}>
            No records to display
          </p>
          <p style={{ fontSize: "14px", margin: 0 }}>
            Try adjusting your filters or check your connection
          </p>
        </div>
      )}

      {/* Pagination */}
      {!loading && !error && data.length > 0 && (
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <button
            onClick={handlePrevPage}
            disabled={page === 0}
            style={{
              padding: "8px 16px",
              backgroundColor: page === 0 ? "#bdc3c7" : "#3498db",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: page === 0 ? "not-allowed" : "pointer",
              fontWeight: "500",
              transition: "background-color 0.3s ease",
              opacity: page === 0 ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (page !== 0) {
                e.target.style.backgroundColor = "#2980b9";
              }
            }}
            onMouseLeave={(e) => {
              if (page !== 0) {
                e.target.style.backgroundColor = "#3498db";
              }
            }}
          >
            ← Previous
          </button>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              minWidth: "200px",
              justifyContent: "center",
            }}
          >
            <span style={{ fontWeight: "500", color: "#2c3e50" }}>
              Page {page + 1}
            </span>
            {totalRecords > 0 && (
              <span style={{ color: "#7f8c8d", fontSize: "12px" }}>
                ({totalRecords} total records)
              </span>
            )}
          </div>

          <button
            onClick={handleNextPage}
            disabled={!canGoNext}
            style={{
              padding: "8px 16px",
              backgroundColor: !canGoNext ? "#bdc3c7" : "#3498db",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: !canGoNext ? "not-allowed" : "pointer",
              fontWeight: "500",
              transition: "background-color 0.3s ease",
              opacity: !canGoNext ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (canGoNext) {
                e.target.style.backgroundColor = "#2980b9";
              }
            }}
            onMouseLeave={(e) => {
              if (canGoNext) {
                e.target.style.backgroundColor = "#3498db";
              }
            }}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
