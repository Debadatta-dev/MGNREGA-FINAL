import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ExportPDF = ({ data }) => {
  const exportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [Object.keys(data[0] || {})],
      body: data.map(r => Object.values(r))
    });
    doc.save("mgnrega-data.pdf");
  };

  return <button onClick={exportPDF}>Export PDF</button>;
};

export default ExportPDF;
