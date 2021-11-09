import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateExercise() {
  // Init state values
  const [exerciseInfo, setExerciseInfo] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
  });
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

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

  // Form submit handler - Add exercise
  const handleSubmit = (e) => {
    e.preventDefault();

    const newExercise = { ...exerciseInfo };

    axios
      .post("http://localhost:5000/exercises/add", newExercise)
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // Get all users + first username
    axios
      .get("http://localhost:5000/users")
      .then((res) => {
        if (res.data.length > 0) {
          setUsers(res.data.map((user) => user.username));
          setExerciseInfo({ ...exerciseInfo, username: res.data[0].username });
        }
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h3 className="mb-3 mt-3">Create New Exercise Log</h3>
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
          Create Exercise
        </button>
      </form>
    </div>
  );
}

export default CreateExercise;
