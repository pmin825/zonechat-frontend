import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import axios from "axios";
import { Button } from "react-bootstrap";

const EditZone = ({ match }) => {
  const { userData, setUserData } = useContext(UserContext);

  const [zone, setZone] = useState({
    name: "",
  });

  useEffect(() => {
    axios.get("/api/zones/" + match.params.id).then((res) => setZone(res.data));
  }, []);

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
      <h1>Edit Zone</h1>
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
          <Button className="btn btn-warning" onClick={zoneUpdate}>
            Update Zone
          </Button>
          <Button className="btn btn-danger" onClick={zoneDelete}>
            Delete Zone
          </Button>
        </>
      ) : (
        <p>You need to log in to edit</p>
      )}
    </div>
  );
};

export default EditZone;
