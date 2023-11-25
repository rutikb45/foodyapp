import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });


  let navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const response = await fetch("http://localhost:4001/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
  
    const result = await response.json();
  
    if (result.success) {
      // Successful login
      localStorage.setItem("authToken", result.authToken);
      console.log("Logged in as:", result.name); // 'name' property might not be present
      navigate("/");
    } else {
      // Failed login
      console.log("error while login");
      alert("Enter Valid Credentials");
    }
  };
  
  
  
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit} style={{ marginTop: "70px" }}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </div>

          <button type="submit" className="btn btn-primary mt-3 ml-2">
            Submit
          </button>
          <Link
            to="/createuser"
            className="mt-3 btn btn-danger"
            style={{ marginLeft: "10px" }}
          >
            I am a new User
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
