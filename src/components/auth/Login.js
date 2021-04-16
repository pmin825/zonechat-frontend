import React, { useState, useContext } from "react";
import { UserContext } from "../../App";

const Login = () => {
  const { userData, setUserData } = useContext(UserContext);

  const [user, setUser] = useState({
    name: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: user.name,
      password: user.password,
    };
    // axios.post("/api/users", newUser).then((res) => console.log(res.data));
    console.log("userData: ", userData);
    setUser({
      name: "",
      password: "",
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
      <h1>Log in</h1>
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
