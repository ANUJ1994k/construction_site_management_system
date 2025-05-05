import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import API from "../services/api";

const TaskProgressTracking = () => {
  const { siteId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [laborCount, setLaborCount] = useState("");
  const [materialsUsed, setMaterialsUsed] = useState("");
  const [date, setDate] = useState("");
  const [progressList, setProgressList] = useState([]);

  useEffect(() => {
    fetchTasks();
    fetchProgress();
  }, [siteId]);

  const fetchTasks = async () => {
    try {
      const res = await API.get(`/tasks/site/${siteId}`);
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to load tasks", err);
    }
  };

  const fetchProgress = async () => {
    try {
      const res = await API.get(`/progress/site/${siteId}`);
      setProgressList(res.data);
    } catch (err) {
      console.error("Failed to load progress reports", err);
    }
  };

  const submitProgress = async (e) => {
    e.preventDefault();
    try {
      await API.post("/progress", {
        taskId: selectedTaskId,
        laborCount: Number(laborCount),
        materialsUsed,
        date,
      });
      setLaborCount("");
      setMaterialsUsed("");
      setDate("");
      fetchProgress();
    } catch (err) {
      alert("Failed to submit progress");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Daily Progress Tracking</h1>

      <div className="max-w-2xl bg-white p-6 shadow rounded mb-8">
        <h2 className="text-xl font-semibold mb-4">Record Progress</h2>
        <form onSubmit={submitProgress}>
          <select
            value={selectedTaskId}
            onChange={(e) => setSelectedTaskId(e.target.value)}
            className="w-full border p-2 mb-3 rounded"
            required
          >
            <option value="">Select Task</option>
            {tasks.map((task) => (
              <option key={task._id} value={task._id}>{task.name}</option>
            ))}
          </select>

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
            placeholder="Materials Used"
            value={materialsUsed}
            onChange={(e) => setMaterialsUsed(e.target.value)}
            className="w-full border p-2 mb-3 rounded"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border p-2 mb-3 rounded"
            required
          />

          <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Submit Progress
          </button>
        </form>
      </div>

      <div className="max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4">Progress Records</h2>
        <div className="grid gap-4">
          {progressList.map((progress) => (
            <div key={progress._id} className="bg-white p-4 rounded shadow">
              <p><strong>Task:</strong> {progress.taskId.name}</p>
              <p><strong>Date:</strong> {progress.date.slice(0, 10)}</p>
              <p><strong>Labor:</strong> {progress.laborCount}</p>
              <p><strong>Materials:</strong> {progress.materialsUsed}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskProgressTracking;
