// src/components/Filters.jsx
import React, { useEffect, useState } from "react";

/*
  Props:
    onChange({ state, district }) - required callback
    baseUrl (optional) - base backend URL
*/
export default function Filters({ onChange, baseUrl }) {
  const BASE = baseUrl || "https://mgnrega-final-1-eaft.onrender.com";

  const [records, setRecords] = useState([]); // raw records from /api/filters
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [stateSel, setStateSel] = useState("");
  const [districtSel, setDistrictSel] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load records once on mount
  useEffect(() => {
    async function loadFilters() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${BASE}/api/filters`);
        const json = await res.json();

        if (!res.ok) {
          console.error("/api/filters error:", json);
          setError(json.error || "Failed to load filters");
          setRecords([]);
          setStates([]);
        } else {
          // Server returns { records: [...] }
          const recs = json.records ?? json;

          if (!Array.isArray(recs)) {
            console.error("/api/filters returned unexpected shape:", json);
            setError("Unexpected filter response");
            setRecords([]);
            setStates([]);
          } else {
            setRecords(recs);
            const uniqueStates = Array.from(
              new Set(recs.map((r) => r.state_name).filter(Boolean))
            ).sort();
            setStates(uniqueStates);
          }
        }
      } catch (err) {
        console.error("Failed fetch /api/filters:", err);
        setError("Network error while loading filters");
        setRecords([]);
        setStates([]);
      } finally {
        setLoading(false);
      }
    }

    loadFilters();
  }, [BASE]);

  // Update districts when state selected
  useEffect(() => {
    if (!stateSel) {
      setDistricts([]);
      setDistrictSel("");
      onChange && onChange({ state: "", district: "" });
      return;
    }

    const dlist = Array.from(
      new Set(
        records
          .filter((r) => r.state_name === stateSel)
          .map((r) => r.district_name)
          .filter(Boolean)
      )
    ).sort();

    setDistricts(dlist);
    setDistrictSel("");
    onChange && onChange({ state: stateSel, district: "" });
  }, [stateSel, records, onChange]);

  // When district changes notify parent
  useEffect(() => {
    onChange && onChange({ state: stateSel, district: districtSel });
  }, [districtSel, stateSel, onChange]);

  const handleReset = () => {
    setStateSel("");
    setDistrictSel("");
    setDistricts([]);
    onChange && onChange({ state: "", district: "" });
  };

  return (
    <div>
      {/* Status Messages */}
      <div style={{ marginBottom: "12px" }}>
        {loading && (
          <span style={{ color: "#3498db", fontWeight: "500" }}>
            ⏳ Loading filters...
          </span>
        )}
        {error && (
          <span style={{ color: "#e74c3c", fontWeight: "500" }}>
            ❌ Error: {error}
          </span>
        )}
      </div>

      {/* Filter Controls */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          alignItems: "flex-end",
        }}
      >
        {/* State Selector */}
        <div>
          <label htmlFor="state-select" style={{ display: "block", marginBottom: "6px", fontWeight: "500" }}>
            State
          </label>
          <select
            id="state-select"
            value={stateSel}
            onChange={(e) => setStateSel(e.target.value)}
            disabled={loading || records.length === 0}
            style={{
              minWidth: "200px",
              padding: "8px 12px",
              border: "1px solid #bdc3c7",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            <option value="">-- Select State --</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* District Selector */}
        <div>
          <label htmlFor="district-select" style={{ display: "block", marginBottom: "6px", fontWeight: "500" }}>
            District
          </label>
          <select
            id="district-select"
            value={districtSel}
            onChange={(e) => setDistrictSel(e.target.value)}
            disabled={!districts.length || loading}
            style={{
              minWidth: "200px",
              padding: "8px 12px",
              border: "1px solid #bdc3c7",
              borderRadius: "4px",
              fontSize: "14px",
              backgroundColor: !districts.length ? "#ecf0f1" : "white",
              cursor: !districts.length ? "not-allowed" : "pointer",
            }}
          >
            <option value="">-- Select District --</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          style={{
            padding: "8px 16px",
            backgroundColor: "#95a5a6",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "500",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#7f8c8d")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#95a5a6")}
        >
          🔄 Reset Filters
        </button>
      </div>

      {/* Info Text */}
      {stateSel && districtSel && (
        <div
          style={{
            marginTop: "12px",
            padding: "8px 12px",
            backgroundColor: "#d5f4e6",
            color: "#27ae60",
            borderRadius: "4px",
            fontSize: "14px",
          }}
        >
          ✓ Showing data for {districtSel}, {stateSel}
        </div>
      )}
    </div>
  );
}
