import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import API from "../services/api";

const MaterialManagement = () => {
  const { siteId } = useParams();
  const [site, setSite] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");

  useEffect(() => {
    fetchSiteDetails();
    fetchMaterials();
  }, [siteId]);

  const fetchSiteDetails = async () => {
    try {
      const res = await API.get(`/sites/${siteId}`);
      setSite(res.data);
    } catch (error) {
      console.error("Error fetching site details", error);
    }
  };

  const fetchMaterials = async () => {
    try {
      const res = await API.get(`/materials/site/${siteId}`);
      setMaterials(res.data);
    } catch (error) {
      console.error("Error fetching materials", error);
    }
  };

  const addMaterial = async (e) => {
    e.preventDefault();
    try {
      await API.post("/materials", {
        siteId,
        name,
        quantity,
        unit,
      });
      setName("");
      setQuantity("");
      setUnit("");
      fetchMaterials();
    } catch (error) {
      alert("Failed to add material");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Materials for Site: {site?.name}</h1>

      <div className="max-w-lg bg-white p-6 shadow rounded mb-8">
        <h2 className="text-xl font-semibold mb-4">Add Received Material</h2>
        <form onSubmit={addMaterial}>
          <input
            type="text"
            placeholder="Material Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 mb-3 rounded"
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full border p-2 mb-3 rounded"
            required
          />
          <input
            type="text"
            placeholder="Unit (e.g. kg, bags)"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full border p-2 mb-3 rounded"
            required
          />
          <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Add Material
          </button>
        </form>
      </div>

      <div className="max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4">Received Materials</h2>
        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Quantity</th>
              <th className="text-left p-2">Unit</th>
              <th className="text-left p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((mat) => (
              <tr key={mat._id} className="border-t">
                <td className="p-2">{mat.name}</td>
                <td className="p-2">{mat.quantity}</td>
                <td className="p-2">{mat.unit}</td>
                <td className="p-2">{new Date(mat.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MaterialManagement;
