import React, { useEffect, useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

const ReportsScreen = () => {
  const [progressReports, setProgressReports] = useState([]);
  const [materialReports, setMaterialReports] = useState([]);
  const [taskFilter, setTaskFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchReports();
  }, [taskFilter, startDate, endDate]);

  const fetchReports = async () => {
    try {
      const progressRes = await axios.get("http://localhost:5000/api/progress", {
        params: { taskId: taskFilter, startDate, endDate }
      });
      setProgressReports(progressRes.data);

      const materialRes = await axios.get("http://localhost:5000/api/material", {
        params: { startDate, endDate }
      });
      setMaterialReports(materialRes.data);
    } catch (err) {
      console.error("Failed to fetch reports", err);
    }
  };

  const exportToExcel = () => {
    const progressSheet = XLSX.utils.json_to_sheet(progressReports);
    const materialSheet = XLSX.utils.json_to_sheet(materialReports);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, progressSheet, "ProgressReports");
    XLSX.utils.book_append_sheet(wb, materialSheet, "MaterialReports");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    saveAs(blob, "SiteReports.xlsx");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Reports</h1>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Filter by Task ID"
          value={taskFilter}
          onChange={(e) => setTaskFilter(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={exportToExcel}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Export to Excel
        </button>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Daily Progress Reports</h2>
        <div className="grid gap-4">
          {progressReports.map((entry) => (
            <div key={entry._id} className="bg-white p-4 rounded shadow">
              <p><strong>Task:</strong> {entry.task?.name || entry.taskId}</p>
              <p><strong>Labor:</strong> {entry.laborCount}</p>
              <p><strong>Material:</strong> {entry.materialUsed}</p>
              <p><strong>Status:</strong> {entry.approved ? "Approved" : "Pending"}</p>
              <p className="text-sm text-gray-500">{new Date(entry.date).toLocaleDateString()}</p>
              {!entry.approved && (
                <button
                  className="mt-2 text-sm text-green-600 hover:underline"
                  onClick={async () => {
                    await axios.put(`http://localhost:5000/api/progress/${entry._id}/approve`);
                    fetchReports();
                  }}
                >
                  Approve
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-3">Material Received Reports</h2>
        <div className="grid gap-4">
          {materialReports.map((entry) => (
            <div key={entry._id} className="bg-white p-4 rounded shadow">
              <p><strong>Material:</strong> {entry.materialName}</p>
              <p><strong>Quantity:</strong> {entry.quantity}</p>
              <p className="text-sm text-gray-500">{new Date(entry.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsScreen;
