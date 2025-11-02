// client/src/App.jsx
import React, { useCallback, useEffect, useState } from "react";
import Filters from "./components/Filters";
import DataTable from "./components/DataTable";

const BASE_URL = "https://mgnrega-final-1-eaft.onrender.com"; // <-- Render backend

export default function App() {
  const [selected, setSelected] = useState({ state: "", district: "" });
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // callback for Filters component
  const handleFilterChange = useCallback(({ state, district }) => {
    setSelected({ state, district });
    setPage(0);
  }, []);

  // fetch data when filters or page changes
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
        } else {
          // server returns either { records: [...], total: N } or records array
          const records = json.records ?? json;
          setData(Array.isArray(records) ? records : []);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load data (network or server error)");
        setData([]);
      } finally {
        setLoading(false);
      }
    }

    // only fetch if user selected something OR we still want default empty table
    load();
  }, [selected, page]);

  return (
    <div style={{ padding: 16 }}>
      <h1>MGNREGA Dashboard</h1>

      <Filters onChange={handleFilterChange} baseUrl={BASE_URL} />

      <div style={{ marginTop: 12 }}>
        {loading && <div>Loading data...</div>}
        {error && <div style={{ color: "red" }}>{error}</div>}
        {!loading && !error && <DataTable data={data} />}
      </div>

      <div style={{ marginTop: 12 }}>
        <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>
          Prev
        </button>
        <span style={{ margin: "0 10px" }}>Page {page + 1}</span>
        <button onClick={() => setPage((p) => p + 1)} disabled={data.length < rowsPerPage}>
          Next
        </button>
      </div>
    </div>
  );
}
