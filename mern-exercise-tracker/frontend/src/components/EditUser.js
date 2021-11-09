import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function EditUser() {
  const [username, setUsername] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      username,
    };

    // Update user in MongoDB
    axios
      .put(`http://localhost:5000/users/update/${id}`, updatedUser)
      .then((res) => {
        console.log(res.data);
        navigate("/users");
      })
      .catch((err) => console.log(err));

    setUsername("");
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${id}`)
      .then((res) => setUsername(res.data.username));
  }, [id]);

  return (
    <div>
      <h3 className="mb-3 mt-3">Edit User</h3>
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
          Update User
        </button>
      </form>
    </div>
  );
}

export default EditUser;
