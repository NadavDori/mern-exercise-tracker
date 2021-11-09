import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditExercise() {
  const [exerciseInfo, setExerciseInfo] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
  });

  const [users, setUsers] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    let name = "";
    let value = "";
    if (!(e instanceof Date)) {
      name = e.target.name;
      value = e.target.value;
    } else {
      name = "date";
      value = e;
    }
    setExerciseInfo({ ...exerciseInfo, [name]: value });
  };

  // Form submit handler - Update exercise
  const handleSubmit = (e) => {
    e.preventDefault();

    const updateExercise = {
      ...exerciseInfo,
    };

    axios
      .put(`http://localhost:5000/exercises/update/${id}`, updateExercise)
      .then((res) => console.log(res.data))
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // Get exercise info to edit
    axios
      .get(`http://localhost:5000/exercises/${id}`)
      .then((res) => {
        const { username, description, duration, date } = res.data;
        setExerciseInfo({
          username,
          description,
          duration,
          date: new Date(date),
        });
      })
      .catch((err) => console.log(err));

    // Get all users
    axios.get("http://localhost:5000/users").then((res) => {
      if (res.data.length > 0) {
        setUsers(res.data.map((user) => user.username));
      }
    });
  }, [id]);

  return (
    <div>
      <h3 className="mb-3 mt-3">Edit Exercise</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <label className="input-group-text">Username: </label>
          <select
            required
            className="form-select"
            name="username"
            value={exerciseInfo.username}
            onChange={handleChange}
          >
            {users.map((user) => {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text">Description: </label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={exerciseInfo.description}
            onChange={handleChange}
          />
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text">Duration: </label>
          <input
            type="text"
            className="form-control"
            name="duration"
            value={exerciseInfo.duration}
            onChange={handleChange}
          />
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text">Date: </label>
          <div>
            <DatePicker
              className="form-control"
              name="date"
              selected={exerciseInfo.date}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-sm">
          Update Exercise
        </button>
      </form>
    </div>
  );
}

export default EditExercise;
