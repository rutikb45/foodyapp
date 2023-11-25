import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate} from "react-router-dom";


const Signup = () => {

  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    geolocation: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:4001/api/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });

    const result = await response.json();

    if (result.success) {
      console.log(result);
    } else {
      alert('Enter Valid Credentials');
    }
    
    if(credentials.name && credentials.email && credentials.password && credentials.location !== null){
      navigate('/');
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit} style={{marginTop: "70px"}}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={credentials.name}
              onChange={handleChange}
            />
          </div>
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
          <div className="form-group">
            <label htmlFor="geolocation">Address</label>
            <input
              type="text"
              className="form-control"
              id="geolocation"
              name="geolocation"
              value={credentials.geolocation}
              onChange={handleChange}
              placeholder="Address"
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3 ml-2">
            Submit
          </button>
          <Link to="/login" className="mt-3 btn btn-danger" style={{ marginLeft: '10px' }}>
            Already a user
          </Link>
        </form>
      </div>
    </>
  );
};

export default Signup;
