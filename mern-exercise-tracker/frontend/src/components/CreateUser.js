import React, { useState } from "react";
import axios from "axios";

function CreateUser() {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username,
    };

    // Add user to MongoDB
    axios
      .post("http://localhost:5000/users/add", newUser)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    setUsername("");
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
