import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewProgress = () => {
  const { siteId, taskId } = useParams();
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    fetchProgress();
  }, [taskId]);

  const fetchProgress = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/progress/task/${taskId}`);
      setProgress(res.data);
    } catch (err) {
      console.error("Failed to fetch progress", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Task Progress</h1>

      <div className="max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4">Progress Entries</h2>
        <div className="grid gap-4">
          {progress.map((entry) => (
            <div key={entry._id} className="bg-white p-4 rounded shadow">
              <p><strong>Labor:</strong> {entry.laborCount}</p>
              <p><strong>Material:</strong> {entry.materialUsed}</p>
              <p><strong>Workers:</strong> {entry.workers.join(", ")}</p>
              <p className="text-sm text-gray-500">{new Date(entry.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewProgress;
