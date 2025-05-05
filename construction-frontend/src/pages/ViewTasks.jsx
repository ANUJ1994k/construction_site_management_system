import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ViewTasks = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch all tasks for the site
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
        fetchTasks();
      } catch (err) {
        console.error("Failed to delete task", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">View Tasks</h1>

      <div className="max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4">All Tasks</h2>
        <div className="grid gap-4">
          {tasks.map((task) => (
            <div key={task._id} className="bg-white p-4 rounded shadow flex justify-between">
              <div>
                <p><strong>Task Name:</strong> {task.name}</p>
                <p><strong>Status:</strong> {task.status}</p>
              </div>
              <div className="flex gap-2">
                <Link to={`/site/:siteId/task/${task._id}/progress/view`} className="text-blue-600 hover:underline">
                  View Progress
                </Link>
                <Link to={`/site/:siteId/task/${task._id}/edit`} className="text-yellow-600 hover:underline">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewTasks;
