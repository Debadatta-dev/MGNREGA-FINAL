// src/components/ExportPDF.jsx
import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ExportPDF = ({ data = [] }) => {
  const [exporting, setExporting] = useState(false);

  const exportPDF = async () => {
    if (!data || data.length === 0) {
      alert("No data to export");
      return;
    }

    setExporting(true);

    try {
      const doc = new jsPDF("l", "mm", "a4"); // landscape format
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Add header
      doc.setFillColor(44, 62, 80);
      doc.rect(0, 0, pageWidth, 20, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("MGNREGA District Performance Report", 14, 12);

      // Add metadata
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text(
        `Generated: ${new Date().toLocaleString("en-IN")}`,
        pageWidth - 60,
        12
      );
      doc.text(`Records: ${data.length}`, pageWidth - 60, 17);

      // Prepare table data
      const columns = Object.keys(data[0] || {})
        .filter(
          (k) =>
            !k.startsWith("_") &&
            !["id", "createdAt", "updatedAt", "__v"].includes(k.toLowerCase())
        )
        .sort();

      const rows = data.map((record) =>
        columns.map((col) => {
          const value = record[col];

          if (typeof value === "number") {
            // Format large numbers
            if (value > 1000000) {
              return (value / 1000000).toFixed(2) + "M";
            } else if (value > 1000) {
              return (value / 1000).toFixed(1) + "K";
            }
            return value.toLocaleString("en-IN");
          }

          if (value instanceof Date || /^\d{4}-\d{2}-\d{2}/.test(String(value))) {
            try {
              return new Date(value).toLocaleDateString("en-IN");
            } catch (e) {
              return String(value);
            }
          }

          return String(value || "-").substring(0, 50); // Truncate long strings
        })
      );

      // Add table
      autoTable(doc, {
        head: [columns.map((c) => c.replace(/_/g, " ").toUpperCase())],
        body: rows,
        startY: 25,
        theme: "grid",
        margin: { top: 25, right: 10, bottom: 10, left: 10 },
        headerStyles: {
          fillColor: [52, 152, 219],
          textColor: [255, 255, 255],
          fontStyle: "bold",
          fontSize: 10,
          font: "helvetica",
          cellPadding: 4,
        },
        bodyStyles: {
          textColor: [50, 50, 50],
          fontSize: 8,
          font: "helvetica",
          cellPadding: 3,
        },
        alternateRowStyles: {
          fillColor: [248, 249, 250],
        },
        rowPageBreak: "avoid",
        didDrawPage: (data) => {
          // Footer
          const pageCount = doc.internal.pages.length - 1;
          const pageSize = doc.internal.pageSize;
          const pageHeight = pageSize.getHeight();
          const pageWidth = pageSize.getWidth();

          doc.setTextColor(150);
          doc.setFontSize(8);
          doc.text(
            `Page ${data.pageNumber} of ${pageCount}`,
            pageWidth / 2,
            pageHeight - 10,
            { align: "center" }
          );

          // Timestamp
          doc.text("MGNREGA Dashboard", 10, pageHeight - 10);
        },
      });

      // Save PDF
      const fileName = `mgnrega-report-${new Date()
        .toISOString()
        .split("T")[0]}.pdf`;
      doc.save(fileName);

      alert(`✓ PDF exported successfully as ${fileName}`);
    } catch (error) {
      console.error("PDF export error:", error);
      alert("Error exporting PDF. Check console for details.");
    } finally {
      setExporting(false);
    }
  };

  return (
    <button
      onClick={exportPDF}
      disabled={exporting || !data || data.length === 0}
      style={{
        padding: "8px 16px",
        backgroundColor: exporting ? "#95a5a6" : "#27ae60",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: exporting ? "not-allowed" : "pointer",
        fontWeight: "500",
        fontSize: "14px",
        transition: "background-color 0.3s ease",
        opacity: exporting ? 0.7 : 1,
      }}
      onMouseEnter={(e) => {
        if (!exporting && data && data.length > 0) {
          e.target.style.backgroundColor = "#229954";
        }
      }}
      onMouseLeave={(e) => {
        if (!exporting && data && data.length > 0) {
          e.target.style.backgroundColor = "#27ae60";
        }
      }}
      title={!data || data.length === 0 ? "No data to export" : "Click to export data as PDF"}
    >
      {exporting ? "⏳ Exporting..." : "📥 Export to PDF"}
    </button>
  );
};

export default ExportPDF;
