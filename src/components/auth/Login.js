import React, { useState, useContext } from "react";
import { UserContext } from "../../App";
import axios from "axios";
import ErrorMsg from "../ErrorMsg";

const Login = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [errorMsg, setErrorMsg] = useState("");

  const [user, setUser] = useState({
    name: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        name: user.name,
        password: user.password,
      };
      const loginResponse = await axios.post("/api/users/login", newUser);
      console.log(loginResponse.data);

      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user,
      });
      localStorage.setItem("auth-token", loginResponse.data.token);
      window.location = "/allzones";

      setUser({
        name: "",
        password: "",
      });
    } catch (error) {
      error.response.data.msg
        ? setErrorMsg(error.response.data.msg)
        : setErrorMsg("We have an error");
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
      <h1>Log in</h1>
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
        <input type="submit" value="Log In" />
      </form>
    </div>
  );
};

export default Login;
