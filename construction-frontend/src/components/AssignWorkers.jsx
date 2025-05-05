import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AssignWorkers = () => {
  const { siteId, taskId } = useParams();
  const [workers, setWorkers] = useState([]);
  const [assignedWorkers, setAssignedWorkers] = useState([]);

  // Fetch all available workers
  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/workers`);
      setWorkers(res.data);
    } catch (err) {
      console.error("Failed to fetch workers", err);
    }
  };

  const assignWorkers = async () => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${taskId}/assign`, {
        workers: assignedWorkers,
      });
      alert("Workers assigned successfully!");
    } catch (err) {
      console.error("Failed to assign workers", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Assign Workers to Task</h1>
      <div className="bg-white p-6 rounded shadow max-w-xl">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Select Workers</h3>
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
        <button
          onClick={assignWorkers}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Assign Workers
        </button>
      </div>
    </div>
  );
};

export default AssignWorkers;
