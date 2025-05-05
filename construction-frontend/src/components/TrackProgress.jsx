import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const TrackProgress = () => {
  const { siteId, taskId } = useParams();
  const [laborCount, setLaborCount] = useState("");
  const [materialUsed, setMaterialUsed] = useState("");
  const [workers, setWorkers] = useState([]);
  const [assignedWorkers, setAssignedWorkers] = useState([]);

  // Fetch assigned workers for the task
  useEffect(() => {
    fetchAssignedWorkers();
  }, [taskId]);

  const fetchAssignedWorkers = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/tasks/${taskId}/workers`);
      setAssignedWorkers(res.data);
    } catch (err) {
      console.error("Failed to fetch workers", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/progress", {
        taskId,
        laborCount: Number(laborCount),
        materialUsed,
        workers: assignedWorkers,
      });
      setLaborCount("");
      setMaterialUsed("");
    } catch (err) {
      console.error("Failed to record progress", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Track Progress for Task</h1>

      <div className="bg-white p-6 rounded shadow max-w-xl mb-8">
        <h2 className="text-xl font-semibold mb-4">Record Progress</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Labor Count"
            value={laborCount}
            onChange={(e) => setLaborCount(e.target.value)}
            className="w-full border p-2 mb-3 rounded"
            required
          />
          <input
            type="text"
            placeholder="Material Used"
            value={materialUsed}
            onChange={(e) => setMaterialUsed(e.target.value)}
            className="w-full border p-2 mb-3 rounded"
            required
          />

          {/* Assign workers */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Assign Workers</h3>
            {workers.map((worker) => (
              <div key={worker._id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={assignedWorkers.includes(worker._id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setAssignedWorkers([...assignedWorkers, worker._id]);
                    } else {
                      setAssignedWorkers(
                        assignedWorkers.filter((id) => id !== worker._id)
                      );
                    }
                  }}
                  className="mr-2"
                />
                <span>{worker.name}</span>
              </div>
            ))}
          </div>

          <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Submit Progress
          </button>
        </form>
      </div>
    </div>
  );
};

export default TrackProgress;
