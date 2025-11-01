import { useEffect, useState } from "react";

function Chart({ records }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(records.slice(0, 10));
  }, [records]);

  return (
    <div>
      <h3>Sample Chart (Top 10 Districts)</h3>

      {data.map((d, i) => (
        <div key={i}>
          {d.district_name}: {d.total_works}
        </div>
      ))}
    </div>
  );
}

export default Chart;
