import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const EditTask = () => {
  const { siteId, taskId } = useParams();
  const navigate = useNavigate(); 

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTaskDetails();
  }, [taskId]);

  const fetchTaskDetails = async () => {
    try {
      const res = await API.get(`/tasks/${taskId}`);
      const task = res.data;
      setTaskName(task.name);
      setTaskDescription(task.description);
      setStartDate(task.startDate?.slice(0, 10)); // Ensure date format is compatible with input
      setEndDate(task.endDate?.slice(0, 10));
    } catch (err) {
      console.error("Failed to fetch task details", err);
      setError("Unable to load task details.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskName || !taskDescription || !startDate || !endDate) {
      setError("All fields are required!");
      return;
    }

    try {
      await API.put(`/tasks/${taskId}`, {
        name: taskName,
        description: taskDescription,
        startDate,
        endDate,
      });
      navigate(`/site/${siteId}/tasks`); // ✅ Correct usage of navigate
    } catch (err) {
      console.error("Error updating task:", err);
      setError("Failed to update task. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Task</h1>
      <div className="bg-white p-6 rounded shadow max-w-xl">
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full border p-2 mb-3 rounded"
            required
          />
          <textarea
            placeholder="Task Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="w-full border p-2 mb-3 rounded"
            required
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border p-2 mb-3 rounded"
            required
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border p-2 mb-3 rounded"
            required
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
