import React, { useState, useEffect } from "react";
import axios from "axios";

const EditZone = ({ match }) => {
  const [zone, setZone] = useState({
    name: "",
  });

  useEffect(() => {
    axios.get("/api/zones/" + match.params.id).then((res) => setZone(res.data));
  }, []);

  return (
    <div>
      <h1>Edit {zone.name}</h1>
      <p>{zone._id}</p>
    </div>
  );
};

export default EditZone;
