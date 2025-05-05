import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useParams } from "react-router-dom";

function DailyProgressReport() {
  const { siteId } = useParams();
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    API.get(`/daily-progress/${siteId}`)
      .then((res) => setProgress(res.data))
      .catch((err) => console.error(err));
  }, [siteId]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Daily Progress Report</h2>
      <ul className="space-y-2">
        {progress.map((entry) => (
          <li key={entry._id} className="p-3 bg-gray-100 rounded shadow">
            <strong>Date:</strong> {new Date(entry.date).toDateString()}<br />
            <strong>Work Description:</strong> {entry.workDescription}<br />
            <strong>Status:</strong> {entry.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DailyProgressReport;
