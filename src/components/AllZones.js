import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllZones = () => { 
  const [zones, setZones] = useState([]);

  useEffect(() => {
    axios.get("/api/zones").then((res) => setZones(res.data));
  }, []);

  return (
    <div>
      <h1>All Zones</h1>
      <ul style={{ listStyleType: "none" }}>
        {zones.map((z) => (
          <li key={z._id}>
            <Link to={`/zone/${z._id}`}>{z.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllZones;
