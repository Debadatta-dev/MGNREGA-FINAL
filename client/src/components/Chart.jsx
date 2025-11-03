// src/components/Chart.jsx
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Chart({ records = [] }) {
  const [chartData, setChartData] = useState(null);
  const [displayMode, setDisplayMode] = useState("line");

  useEffect(() => {
    if (!records || records.length === 0) return;

    // Get top 10 records by total_works
    const topRecords = records
      .filter((r) => r.total_works !== undefined && r.total_works !== null)
      .sort((a, b) => (b.total_works || 0) - (a.total_works || 0))
      .slice(0, 10);

    if (topRecords.length === 0) return;

    const labels = topRecords.map((r) => r.district_name || "Unknown");
    const workData = topRecords.map((r) => r.total_works || 0);
    const workerData = topRecords.map((r) => r.total_workers || 0);
    const budgetData = topRecords.map((r) => r.total_budget || 0);

    setChartData({
      labels,
      datasets: [
        {
          label: "Total Works",
          data: workData,
          borderColor: "#3498db",
          backgroundColor: "rgba(52, 152, 219, 0.1)",
          borderWidth: 2.5,
          tension: 0.4,
          fill: true,
          pointRadius: 5,
          pointBackgroundColor: "#3498db",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          pointHoverRadius: 7,
        },
        {
          label: "Total Workers",
          data: workerData,
          borderColor: "#e74c3c",
          backgroundColor: "rgba(231, 76, 60, 0.1)",
          borderWidth: 2.5,
          tension: 0.4,
          fill: true,
          pointRadius: 5,
          pointBackgroundColor: "#e74c3c",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          pointHoverRadius: 7,
        },
        {
          label: "Total Budget (Crores)",
          data: budgetData.map((b) => (typeof b === "number" ? b / 1000000 : 0)),
          borderColor: "#27ae60",
          backgroundColor: "rgba(39, 174, 96, 0.1)",
          borderWidth: 2.5,
          tension: 0.4,
          fill: true,
          pointRadius: 5,
          pointBackgroundColor: "#27ae60",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          pointHoverRadius: 7,
        },
      ],
    });
  }, [records]);

  if (!chartData) {
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
          📊 No data available for charts
        </p>
      </div>
    );
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: 12,
            weight: "500",
          },
          padding: 15,
          usePointStyle: true,
          boxWidth: 8,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 12,
        },
        borderColor: "rgba(255, 255, 255, 0.3)",
        borderWidth: 1,
        displayColors: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
          drawBorder: true,
        },
        ticks: {
          font: {
            size: 11,
          },
          callback: (value) => {
            if (value >= 1000000) {
              return (value / 1000000).toFixed(1) + "M";
            } else if (value >= 1000) {
              return (value / 1000).toFixed(1) + "K";
            }
            return value;
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
    },
  };

  return (
    <div>
      {/* Chart Type Selector */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <button
          onClick={() => setDisplayMode("line")}
          style={{
            padding: "8px 16px",
            backgroundColor: displayMode === "line" ? "#3498db" : "#bdc3c7",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "500",
            transition: "all 0.3s ease",
          }}
        >
          📈 Line Chart
        </button>
        <button
          onClick={() => setDisplayMode("bar")}
          style={{
            padding: "8px 16px",
            backgroundColor: displayMode === "bar" ? "#3498db" : "#bdc3c7",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "500",
            transition: "all 0.3s ease",
          }}
        >
          📊 Bar Chart
        </button>
      </div>

      {/* Line Chart */}
      {displayMode === "line" && (
        <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "4px", marginBottom: "30px", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)" }}>
          <h3 style={{ marginBottom: "15px" }}>
            Top 10 Districts - Performance Comparison (Line Chart)
          </h3>
          <Line data={chartData} options={chartOptions} />
        </div>
      )}

      {/* Bar Chart */}
      {displayMode === "bar" && (
        <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "4px", marginBottom: "30px", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)" }}>
          <h3 style={{ marginBottom: "15px" }}>
            Top 10 Districts - Performance Comparison (Bar Chart)
          </h3>
          <Bar data={chartData} options={chartOptions} />
        </div>
      )}

      {/* Statistics Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px" }}>
        <div
          style={{
            backgroundColor: "white",
            padding: "15px",
            borderRadius: "4px",
            textAlign: "center",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            borderLeft: "4px solid #3498db",
          }}
        >
          <div style={{ fontSize: "12px", color: "#7f8c8d", marginBottom: "8px" }}>
            Total Works
          </div>
          <div style={{ fontSize: "24px", fontWeight: "bold", color: "#3498db" }}>
            {chartData.datasets[0].data
              .reduce((a, b) => a + b, 0)
              .toLocaleString("en-IN")}
          </div>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "15px",
            borderRadius: "4px",
            textAlign: "center",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            borderLeft: "4px solid #e74c3c",
          }}
        >
          <div style={{ fontSize: "12px", color: "#7f8c8d", marginBottom: "8px" }}>
            Total Workers
          </div>
          <div style={{ fontSize: "24px", fontWeight: "bold", color: "#e74c3c" }}>
            {chartData.datasets[1].data
              .reduce((a, b) => a + b, 0)
              .toLocaleString("en-IN")}
          </div>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "15px",
            borderRadius: "4px",
            textAlign: "center",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            borderLeft: "4px solid #27ae60",
          }}
        >
          <div style={{ fontSize: "12px", color: "#7f8c8d", marginBottom: "8px" }}>
            Total Budget
          </div>
          <div style={{ fontSize: "24px", fontWeight: "bold", color: "#27ae60" }}>
            ₹{chartData.datasets[2].data
              .reduce((a, b) => a + b, 0)
              .toLocaleString("en-IN", { maximumFractionDigits: 0 })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart;
