// src/components/DataTable.jsx
import React, { useState } from "react";

export default function DataTable({ data = [] }) {
  const [sortConfig, setSortConfig] = useState({ key: null, order: "asc" });

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "40px 20px",
          color: "#7f8c8d",
          backgroundColor: "#ecf0f1",
          borderRadius: "4px",
        }}
      >
        <p style={{ fontSize: "16px", margin: 0 }}>
          📊 No records to display
        </p>
        <p style={{ fontSize: "12px", margin: "8px 0 0 0" }}>
          Try adjusting your filters or check your connection
        </p>
      </div>
    );
  }

  // Compute headers (union of keys in data)
  const allKeys = Array.from(
    new Set(data.flatMap((r) => Object.keys(r)))
  ).sort();

  // Filter out sensitive or unnecessary columns
  const displayKeys = allKeys.filter(
    (k) =>
      !k.startsWith("_") &&
      !["id", "createdAt", "updatedAt", "__v"].includes(k.toLowerCase())
  );

  // Sort data if needed
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;

    const sorted = [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      // Handle null/undefined
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return sortConfig.order === "asc" ? 1 : -1;
      if (bVal == null) return sortConfig.order === "asc" ? -1 : 1;

      // Compare values
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortConfig.order === "asc" ? aVal - bVal : bVal - aVal;
      }

      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();
      return sortConfig.order === "asc"
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });

    return sorted;
  }, [data, sortConfig]);

  const handleSort = (key) => {
    setSortConfig({
      key,
      order:
        sortConfig.key === key && sortConfig.order === "asc" ? "desc" : "asc",
    });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return " ⇅";
    return sortConfig.order === "asc" ? " ↑" : " ↓";
  };

  return (
    <div style={{ overflowX: "auto", borderRadius: "4px", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "white",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#34495e", color: "white" }}>
            {displayKeys.map((k) => (
              <th
                key={k}
                onClick={() => handleSort(k)}
                style={{
                  padding: "12px",
                  textAlign: "left",
                  fontWeight: "600",
                  cursor: "pointer",
                  userSelect: "none",
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#2c3e50")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#34495e")
                }
                title={`Click to sort by ${k}`}
              >
                {k.replace(/_/g, " ").toUpperCase()}
                <span style={{ fontSize: "12px", opacity: 0.7 }}>
                  {getSortIndicator(k)}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, i) => (
            <tr
              key={i}
              style={{
                backgroundColor: i % 2 === 0 ? "white" : "#f8f9fa",
                borderBottom: "1px solid #ecf0f1",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  i % 2 === 0 ? "#f0f3f4" : "#e8ebee")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  i % 2 === 0 ? "white" : "#f8f9fa")
              }
            >
              {displayKeys.map((k) => {
                const value = row[k];
                let display = value ?? "-";

                // Format numbers with Indian locale
                if (typeof value === "number") {
                  display = value.toLocaleString("en-IN");
                }

                // Format dates
                if (value instanceof Date || /^\d{4}-\d{2}-\d{2}/.test(String(value))) {
                  try {
                    display = new Date(value).toLocaleDateString("en-IN");
                  } catch (e) {
                    // Keep original value if date parsing fails
                  }
                }

                return (
                  <td
                    key={k + i}
                    title={String(display)}
                    style={{
                      padding: "12px",
                      color: "#2c3e50",
                      maxWidth: "250px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {display}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
