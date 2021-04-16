import React, { useState } from "react";
// import axios from "axios";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: user.name,
      password: user.password,
    };

    if (user.password !== user.confirmPassword) {
      console.log("incorrect password");
    } else {
      console.log(newUser);
    }
    // axios.post("/api/users", newUser).then((res) => console.log(res.data));

    setUser({
      name: "",
      password: "",
      confirmPassword: "",
    });
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
