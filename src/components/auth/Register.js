import React, { useState, useContext } from "react";
import { UserContext } from "../../App";
import axios from "axios";
import ErrorMsg from "../ErrorMsg";

const Register = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [user, setUser] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        name: user.name,
        password: user.password,
      };
      if (user.password !== user.confirmPassword) {
        setErrorMsg("Passwords did not match");
        return;
      } else {
        console.log(newUser);
      }
      await axios.post("/api/users/register", newUser);

      const loginResponse = await axios.post("/api/users/login", newUser);
      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user,
      });
      localStorage.setItem("auth-token", loginResponse.data.token);

      setUser({
        name: "",
        password: "",
        confirmPassword: "",
      });
      window.location = "/allzones";
    } catch (error) {
      error.response.data.msg
        ? setErrorMsg(error.response.data.msg)
        : setErrorMsg("We have some error!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((oldUser) => {
      return {
        ...oldUser,
        [name]: value,
      };
    });
  };

  return (
    <div>
      <h1>Register</h1>
      {errorMsg && <ErrorMsg msg={errorMsg} />}
      <form onSubmit={handleSubmit}>
        <label>User Name: </label>
        <input
          type="text"
          name="name"
          value={user.name}
          required
          onChange={handleChange}
        />
        <br />
        <label>Password: </label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <br />
        <label>Confirm Password: </label>
        <input
          type="password"
          name="confirmPassword"
          value={user.confirmPassword}
          onChange={handleChange}
        />
        <br />
        <input type="submit" value="Register User" />
      </form>
    </div>
  );
};

export default Register;
