// client/src/App.jsx
import React, { useCallback, useEffect, useState } from "react";
import Filters from "./components/Filters";
import DataTable from "./components/DataTable";

export default function App() {
  const [selected, setSelected] = useState({ state: "", district: "" });
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // callback from Filters
  const onFilterChange = useCallback(({ state, district }) => {
    setSelected({ state, district });
    setPage(0);
  }, []);

  // fetch data whenever selected or page changes
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

        const url = `http://localhost:5000/api/data?${params.toString()}`;
        const res = await fetch(url);
        const json = await res.json();
        if (!res.ok) {
          console.error("API error", json);
          setError(json.error || "Server error");
          setData([]);
        } else {
          // server returns { records: [...], total: N } in our server code
          setData(json.records || json || []);
        }
      } catch (err) {
        console.error("Fetch /api/data failed:", err);
        setError("Failed to load data. See console.");
        setData([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [selected, page]);

  return (
    <div>
      <h1>MGNREGA Dashboard</h1>

      <Filters onChange={onFilterChange} />

      <div style={{ marginTop: 12 }}>
        {loading && <div>Loading data...</div>}
        {error && <div style={{ color: "red" }}>{error}</div>}
        {!loading && !error && <DataTable data={data} />}
      </div>

      <div style={{ marginTop: 12 }}>
        <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>
          Prev
        </button>
        <span> Page {page + 1} </span>
        <button onClick={() => setPage((p) => p + 1)} disabled={data.length < rowsPerPage}>
          Next
        </button>
      </div>
    </div>
  );
}
