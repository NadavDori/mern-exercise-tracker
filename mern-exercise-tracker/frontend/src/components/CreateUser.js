import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateUser() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setUsername(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username,
    };

    // Add user to MongoDB
    axios
      .post("http://localhost:5000/users/add", newUser)
      .then((res) => {
        console.log(res.data);
        navigate("/users");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h3 className="mb-3 mt-3">Create New User</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <label className="input-group-text">Username: </label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-sm">
          Create User
        </button>
      </form>
    </div>
  );
}

export default CreateUser;
