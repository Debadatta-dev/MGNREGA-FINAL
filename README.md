
# MGNREGA Full App

This project contains a simple Express server and a Vite + React client that fetches the MGNREGA dataset from Data.gov.in
and displays all parameters in a dynamic table. The client provides dropdowns to filter by State and District, and a global search.

## Run server
cd mgnrega-full-app/server
npm install
npm start

Server runs on http://localhost:5000 and proxies the Data.gov.in API.

## Run client
cd mgnrega-full-app/client
npm install
npm run dev

Client runs on http://localhost:5173
