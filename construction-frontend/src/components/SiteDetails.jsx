import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useParams } from "react-router-dom";

function SiteDetails() {
  const { siteId } = useParams();
  const [site, setSite] = useState({});
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    API.get(`/sites/${siteId}`)
      .then((res) => setSite(res.data))
      .catch((err) => console.error(err));

    API.get(`/tasks/${siteId}`)
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, [siteId]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{site.name}</h2>
      <p>Location: {site.location}</p>
      <p>Start Date: {new Date(site.startDate).toDateString()}</p>

      <h3 className="mt-4 text-xl">Tasks</h3>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task._id} className="p-3 bg-gray-100 rounded shadow">
            <strong>{task.title}</strong><br />
            Status: {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SiteDetails;
