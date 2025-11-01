// client/src/components/DataTable.jsx
import React from "react";

export default function DataTable({ data = [] }) {
  if (!Array.isArray(data) || data.length === 0) {
    return <div>No records to show</div>;
  }

  // gather keys in deterministic order
  const keys = Array.from(new Set(data.flatMap((r) => Object.keys(r))));

  return (
    <div>
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
