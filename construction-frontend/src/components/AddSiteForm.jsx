import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function AddSiteForm() {
  const [siteName, setSiteName] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSite = {
      name: siteName,
      location: location,
      startDate: startDate,
    };

    try {
      await API.post("/sites", newSite);
      alert("Site added successfully!");
      navigate("/"); // Redirect back to site list after successful add
    } catch (err) {
      console.error(err);
      alert("Error adding site!");
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-orange-500">Add New Site</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="siteName" className="block">Site Name</label>
          <input
            type="text"
            id="siteName"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="location" className="block">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="startDate" className="block">Start Date</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="flex justify-end">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md shadow-sm transition duration-200">
            Add Site
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddSiteForm;
