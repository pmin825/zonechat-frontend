import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../App";

const AddZone = () => {
  const { userData, setUserData } = useContext(UserContext);

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
        {userData.user ? (
          <>
            <label>Zone Name: </label>
            <input
              type="text"
              name="name"
              value={zone.name}
              required
              onChange={handleChange}
            />
            <br />
            <input type="submit" value="Add Zone!" />
          </>
        ) : (
          <p>You need to log in to create a new Zone</p>
        )}
      </form>
    </div>
  );
};

export default AddZone;
