import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

const EditZone = ({ match }) => {
  const [zone, setZone] = useState({
    name: "",
  });

  useEffect(() => {
    axios.get("/api/zones/" + match.params.id).then((res) => setZone(res.data));
  });

  const zoneUpdate = () => {
    axios
      .put("/api/zones/" + match.params.id, zone)
      .then((zone) => console.log(zone));
    window.location = "/allzones";
  };

  const zoneDelete = () => {
    axios
      .delete("/api/zones/" + match.params.id, zone)
      .then((res) => console.log(res.status));
    window.location = "/allzones";
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
      <h1>Edit {zone.name}</h1>
      <label>Zone Name: </label>
      <input
        type="text"
        name="name"
        value={zone.name}
        required
        onChange={handleChange}
      />
      <br />
      <Button className="btn btn-warning" onClick={zoneUpdate}>
        Update Zone
      </Button>
      <Button className="btn btn-danger" onClick={zoneDelete}>
        Delete Zone
      </Button>
    </div>
  );
};

export default EditZone;
