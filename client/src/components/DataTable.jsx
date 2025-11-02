// client/src/components/DataTable.jsx
import React from "react";

/*
  DataTable expects `data` to be an array of objects (records).
  It renders all keys present in the dataset (no styling).
*/
export default function DataTable({ data = [] }) {
  if (!Array.isArray(data) || data.length === 0) {
    return <div>No records to show</div>;
  }

  // compute headers (union of keys in data)
  const keys = Array.from(new Set(data.flatMap((r) => Object.keys(r))));

  return (
    <div style={{ overflowX: "auto", marginTop: 12 }}>
      <table border="1" cellPadding="6" cellSpacing="0">
        <thead>
          <tr>
            {keys.map((k) => (
              <th key={k}>{k}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {keys.map((k) => (
                <td key={k + i}>{row[k] ?? ""}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
