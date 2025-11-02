// client/src/components/Filters.jsx
import React, { useEffect, useState } from "react";

/*
 Props:
   onChange({ state, district })  - required callback
   baseUrl (optional) - base backend URL (default uses Render host)
*/
export default function Filters({ onChange, baseUrl }) {
  const BASE = baseUrl || "https://mgnrega-final-1-eaft.onrender.com";

  const [records, setRecords] = useState([]); // raw records returned from /api/filters
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [stateSel, setStateSel] = useState("");
  const [districtSel, setDistrictSel] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // load records once
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
          // server returns { records: [...] } in our server code
          const recs = json.records ?? json;
          if (!Array.isArray(recs)) {
            console.error("/api/filters returned unexpected shape:", json);
            setError("Unexpected filter response");
            setRecords([]);
            setStates([]);
          } else {
            setRecords(recs);
            const uniqueStates = Array.from(new Set(recs.map((r) => r.state_name).filter(Boolean))).sort();
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

  // update districts when state selected
  useEffect(() => {
    if (!stateSel) {
      setDistricts([]);
      setDistrictSel("");
      onChange && onChange({ state: "", district: "" });
      return;
    }
    const dlist = Array.from(
      new Set(records.filter((r) => r.state_name === stateSel).map((r) => r.district_name).filter(Boolean))
    ).sort();
    setDistricts(dlist);
    setDistrictSel("");
    onChange && onChange({ state: stateSel, district: "" });
  }, [stateSel, records, onChange]);

  // when district changes notify parent
  useEffect(() => {
    onChange && onChange({ state: stateSel, district: districtSel });
  }, [districtSel, stateSel, onChange]);

  return (
    <div>
      <div>
        {loading ? <span>Loading filters...</span> : error ? <span style={{ color: "red" }}>{error}</span> : null}
      </div>

      <div style={{ marginTop: 8 }}>
        <label>
          State:&nbsp;
          <select value={stateSel} onChange={(e) => setStateSel(e.target.value)}>
            <option value="">Select State</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        &nbsp;&nbsp;

        <label>
          District:&nbsp;
          <select value={districtSel} onChange={(e) => setDistrictSel(e.target.value)} disabled={!districts.length}>
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
