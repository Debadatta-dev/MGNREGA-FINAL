// server/src/index.js
import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

const API_KEY = "579b464db66ec23bdd00000126de68503ce441fa60c93ade9fecd9d0";
const RESOURCE_ID = "ee03643a-ee4c-48c2-ac30-9f2ff26ab722";

async function fetchFromGov(url) {
  const resp = await axios.get(url, { timeout: 15000 });
  return resp.data;
}

app.get("/api/filters", async (req, res) => {
  try {
    const url = `https://api.data.gov.in/resource/${RESOURCE_ID}?api-key=${API_KEY}&format=json&limit=2000`;
    const json = await fetchFromGov(url);
    if (!json || !json.records) {
      return res.status(500).json({ error: "Invalid upstream response", raw: json });
    }
    // Return the raw records array for the client to derive unique lists
    return res.json({ records: json.records });
  } catch (err) {
    console.error("/api/filters error:", err.message || err);
    return res.status(500).json({ error: "Failed to fetch filters" });
  }
});

app.get("/api/data", async (req, res) => {
  try {
    const { state, district, limit = 10, offset = 0 } = req.query;
    let url = `https://api.data.gov.in/resource/${RESOURCE_ID}?api-key=${API_KEY}&format=json&limit=${encodeURIComponent(limit)}&offset=${encodeURIComponent(offset)}`;
    if (state) url += `&filters[state_name]=${encodeURIComponent(state)}`;
    if (district) url += `&filters[district_name]=${encodeURIComponent(district)}`;

    const json = await fetchFromGov(url);
    if (!json || !json.records) return res.status(500).json({ error: "Invalid upstream response" });
    return res.json({ records: json.records, total: json.total ?? json.count ?? json.records.length });
  } catch (err) {
    console.error("/api/data error:", err.message || err);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
