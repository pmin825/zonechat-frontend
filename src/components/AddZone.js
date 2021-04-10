import React, { useState } from "react";

const AddZone = () => {
  const [zone, setZone] = useState({
    name: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${zone.name}`);
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
