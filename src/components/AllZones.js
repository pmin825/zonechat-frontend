import React, { useState, useEffect } from "react";

const AllZones = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  return (
    <div>
      <h1>All Zones</h1>
      <ul style={{ listStyleType: "none" }}>
        <li>{user.name}</li>
        {/* {zones.map((z) => (
          <li key={z._id}>{z.name}</li>
        ))} */}
      </ul>
    </div>
  );
};

export default AllZones;
