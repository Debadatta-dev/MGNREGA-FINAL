// server/src/index.js
import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // loads .env at project root

const app = express();
app.use(cors());
app.use(express.json());

// Read secrets from environment
const API_KEY = process.env.API_KEY;
const RESOURCE_ID = process.env.RESOURCE_ID;
const PORT = process.env.PORT || 5000;

if (!API_KEY || !RESOURCE_ID) {
  console.error("ERROR: Missing API_KEY or RESOURCE_ID in environment. Please add them to .env");
  process.exit(1);
}

// helper to fetch from data.gov.in with axios and unified errors
async function fetchFromGov(url) {
  try {
    const resp = await axios.get(url, { timeout: 15000 });
    return resp.data;
  } catch (err) {
    console.error("Upstream fetch error:", err.message || err);
    throw new Error("Upstream API fetch failed");
  }
}

/*
  /api/filters
  Returns: { records: [...] }
*/
app.get("/api/filters", async (req, res) => {
  try {
    const url = `https://api.data.gov.in/resource/${RESOURCE_ID}?api-key=${API_KEY}&format=json&limit=2000`;
    const json = await fetchFromGov(url);

    if (!json || !Array.isArray(json.records)) {
      return res.status(500).json({ error: "Invalid upstream response", raw: json });
    }

    return res.json({ records: json.records });
  } catch (err) {
    console.error("/api/filters error:", err.message || err);
    return res.status(500).json({ error: "Failed to fetch filters" });
  }
});

/*
  /api/data
*/
app.get("/api/data", async (req, res) => {
  try {
    const { state, district } = req.query;
    const limit = req.query.limit ?? 10;
    const offset = req.query.offset ?? 0;

    let url = `https://api.data.gov.in/resource/${RESOURCE_ID}?api-key=${API_KEY}&format=json&limit=${encodeURIComponent(limit)}&offset=${encodeURIComponent(offset)}`;
    if (state) url += `&filters[state_name]=${encodeURIComponent(state)}`;
    if (district) url += `&filters[district_name]=${encodeURIComponent(district)}`;

    const json = await fetchFromGov(url);
    if (!json || !Array.isArray(json.records)) {
      return res.status(500).json({ error: "Invalid upstream response", raw: json });
    }

    const total = json.total ?? json.count ?? json.records.length;
    return res.json({ records: json.records, total });
  } catch (err) {
    console.error("/api/data error:", err.message || err);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
});

// ✅ CRITICAL FIX FOR RENDER
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});
