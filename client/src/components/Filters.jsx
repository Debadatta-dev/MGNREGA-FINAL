import React, { useEffect, useState } from "react";

/*
  Props:
    onChange: function({ state: string, district: string })  // called when selection changes
    baseUrl: backend base URL (optional, defaults to Render URL)
*/
export default function Filters({ onChange, baseUrl }) {
  const BASE = baseUrl || "https://mgnrega-final-1-eaft.onrender.com";
  const [records, setRecords] = useState([]);          // raw records from server
  const [states, setStates] = useState([]);            // unique states
  const [districts, setDistricts] = useState([]);      // unique districts for selected state
  const [stateSel, setStateSel] = useState("");
  const [districtSel, setDistrictSel] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // fetch filters (server returns { records: [...] })
    async function loadFilters() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${BASE}/api/filters`);
        const json = await res.json();
        if (res.ok && json.records && Array.isArray(json.records)) {
          setRecords(json.records);
          const uniqueStates = Array.from(
            new Set(json.records.map((r) => r.state_name).filter(Boolean))
          ).sort();
          setStates(uniqueStates);
        } else {
          console.error("/api/filters returned unexpected shape:", json);
          setError("Failed to load filter data (unexpected response). Check server logs.");
        }
      } catch (err) {
        console.error("Failed to fetch /api/filters:", err);
        setError("Failed to load filter data. See console.");
      } finally {
        setLoading(false);
      }
    }
    loadFilters();
  }, [BASE]);

  // when stateSel changes, compute districts for that state
  useEffect(() => {
    if (!stateSel) {
      setDistricts([]);
      setDistrictSel("");
      onChange && onChange({ state: "", district: "" });
      return;
    }
    const dset = Array.from(
      new Set(
        records
          .filter((r) => r.state_name === stateSel)
          .map((r) => r.district_name)
          .filter(Boolean)
      )
    ).sort();
    setDistricts(dset);
    setDistrictSel("");
    onChange && onChange({ state: stateSel, district: "" });
  }, [stateSel, records, onChange]);

  // when districtSel changes, inform parent
  useEffect(() => {
    onChange && onChange({ state: stateSel, district: districtSel });
  }, [districtSel, stateSel, onChange]);

  return (
    <div>
      <div>
        {loading ? (
          <span>Loading filters...</span>
        ) : error ? (
          <span style={{ color: "red" }}>{error}</span>
        ) : null}
      </div>

      <div>
        <label>
          State:&nbsp;
          <select
            value={stateSel}
            onChange={(e) => setStateSel(e.target.value)}
          >
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
          <select
            value={districtSel}
            onChange={(e) => setDistrictSel(e.target.value)}
            disabled={!districts.length}
          >
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
