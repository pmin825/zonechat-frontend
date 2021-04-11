import React, { useState } from "react";
import axios from "axios";

const AddZone = () => {
  const [zone, setZone] = useState({
    name: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newZone = {
      name: zone.name,
    };
    axios.post("/api/zones", newZone).then((res) => console.log(res.data));

    setZone({
      name: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setZone((oldZone) => {
      return {
        ...oldZone,
        [name]: value,
      };
    });
  };

  return (
    <div>
      <h1>Add a Zone</h1>
      <form onSubmit={handleSubmit}>
        <label>Zone Name: </label>
        <input
          type="text"
          name="name"
          value={zone.name}
          required
          onChange={handleChange}
        />
        <br />
      </form>
    </div>
  );
};

export default AddZone;
