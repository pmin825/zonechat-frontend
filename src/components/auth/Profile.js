import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { Button } from "react-bootstrap";

const Profile = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [zones, setZones] = useState([]);

  useEffect(() => {
    axios.get("/api/zones").then((res) => setZones(res.data), []);
  });

  const userDelete = () => {
    axios
      .delete("/api/users/profile", {
        headers: {
          "auth-token": userData.token,
        },
      })
      .then((window.location = "/allzones"));

    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  return (
    <div>
      <h1>User Profile</h1>
      <br />
      <h4>
        <b>User ID: </b>
        {userData.user.id}
      </h4>
      <br />
      <h4>
        <b>User Name: </b>
        {userData.user.name}
      </h4>
      <br />
      <h4>
        <b>Register Date: </b>
        {userData.user.date.toString().slice(0, 10) +
          " @ " +
          userData.user.date.toString().slice(11, 19)}
      </h4>
      <br />
      <h4>
        <b>Zones created by: </b>
        {userData.user.name}
      </h4>

      <ul style={{ listStyleType: "none" }}>
        {zones
          .filter((zone) => {
            if (zone.createdBy === userData.user.name) {
              return zone;
            }
          })
          .map((z) => (
            <li key={z._id}>
              <Link to={`/zone/${z._id}`}>
                <b>{z.name} Zone</b>
              </Link>{" "}
              created by {z.createdBy}
            </li>
          ))}
      </ul>

      <Button className="btn btn-danger" onClick={userDelete}>
        Delete Account
      </Button>
    </div>
  );
};

export default Profile;
