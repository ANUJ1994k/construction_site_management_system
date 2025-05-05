import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../services/api";

const SitesDashboard = () => {
  const [sites, setSites] = useState([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      const res = await API.get("/sites");
      setSites(res.data);
    } catch (error) {
      console.error("Error fetching sites", error);
    }
  };

  const addSite = async (e) => {
    e.preventDefault();
    try {
      await API.post("/sites", { name, location });
      setName("");
      setLocation("");
      fetchSites();
    } catch (error) {
      alert("Failed to add site");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6 flex items-center justify-center">
      <h1 className="text-2xl font-bold text-center mt-5">Construction Sites</h1>
      
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow mb-10">
        <h2 className="text-xl font-semibold mb-4 ">Add New Site</h2>
        <form onSubmit={addSite}>
          <input
            type="text"
            placeholder="Site Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border mb-3 rounded"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border mb-3 rounded"
            required
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Add Site
          </button>
        </form>
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">All Sites</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {sites.map((site) => (
            <div key={site._id} className="bg-white p-4 shadow rounded">
              <h3 className="text-lg font-bold">{site.name}</h3>
              <p className="text-gray-600">{site.location}</p>
              <button
                className="mt-3 bg-green-600 text-white px-4 py-1 rounded"
                onClick={() => {
                  // placeholder for navigation to tasks
                  alert(`Go to site details for ${site.name}`);
                }}
              >
                View Tasks
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SitesDashboard;
