import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const TaskManagement = () => {
  const { siteId } = useParams();
  const [site, setSite] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchSiteDetails();
    fetchTasks();
  }, [siteId]);

  const fetchSiteDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/sites/${siteId}`);
      setSite(res.data);
    } catch (error) {
      console.error("Error fetching site details", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/tasks/site/${siteId}`);
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/tasks", {
        siteId,
        name,
        description,
        status: "Pending",
      });
      setName("");
      setDescription("");
      fetchTasks();
    } catch (error) {
      alert("Failed to add task");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Tasks for Site: {site?.name}</h1>

      <div className="max-w-lg bg-white p-6 shadow rounded mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
        <form onSubmit={addTask}>
          <input
            type="text"
            placeholder="Task Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 mb-3 rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 mb-3 rounded"
            rows={3}
            required
          ></textarea>
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Add Task
          </button>
        </form>
      </div>

      <div className="max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4">Existing Tasks</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {tasks.map((task) => (
            <div key={task._id} className="bg-white p-4 rounded shadow">
              <h3 className="font-bold text-lg">{task.name}</h3>
              <p className="text-gray-700 mb-2">{task.description}</p>
              <span className="inline-block px-3 py-1 text-sm bg-yellow-200 rounded">
                {task.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskManagement;
