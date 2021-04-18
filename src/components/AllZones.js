import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllZones = () => {
  const [zones, setZones] = useState([]);
  const [zoneSearch, setZoneSearch] = useState("");

  useEffect(() => {
    axios.get("/api/zones").then((res) => setZones(res.data));
  }, []);

  return (
    <div>
      <h1>All Zones</h1>
      <br />
      <input
        type="text"
        placeholder="Search Zone..."
        onChange={(e) => {
          setZoneSearch(e.target.value);
        }}
        style={{ margin: "20px" }}
      />
      <ul style={{ listStyleType: "none" }}>
        {zones
          .filter((zone) => {
            if (zone.name.toLowerCase().includes(zoneSearch.toLowerCase())) {
              return zone;
            }
          })
          .map((zone) => (
            <li key={zone._id}>
              <Link to={`/zone/${zone._id}`}>
                <b>{zone.name} Zone</b>
              </Link>{" "}
              created by {zone.createdBy}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default AllZones;
