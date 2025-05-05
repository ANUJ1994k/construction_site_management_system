import React, { useEffect, useState } from "react";
import API from "../services/api";

function SiteList() {
  const [sites, setSites] = useState([]);

  useEffect(() => {
    API.get("/sites")
      .then((res) => setSites(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Construction Sites</h1>
      <ul className="space-y-2">
        {sites.map((site) => (
          <li key={site._id} className="p-3 bg-gray-100 rounded shadow">
            <strong>{site.name}</strong><br />
            Location: {site.location}<br />
            Start Date: {new Date(site.startDate).toDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SiteList;
