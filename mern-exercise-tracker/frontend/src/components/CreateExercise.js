import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateExercise() {
  // Init state values
  const [username, setUsername] = useState("");
  const [desc, setDesc] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();
  // const inputRef = useRef();

  // Form submit handler - Add exercise
  const handleSubmit = (e) => {
    e.preventDefault();

    const newExercise = {
      username,
      description: desc,
      duration,
      date,
    };

    axios
      .post("http://localhost:5000/exercises/add", newExercise)
      .then((res) => console.log(res.data))
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));

    // Reset exercise states
    setDesc("");
    setDuration(0);
    setDate(new Date());
  };

  useEffect(() => {
    // Get all users + first username
    axios.get("http://localhost:5000/users").then((res) => {
      if (res.data.length > 0) {
        setUsers(res.data.map((user) => user.username));
        setUsername(res.data[0].username);
      }
    });
  }, []);

  return (
    <div>
      <h3 className="mb-3 mt-3">Create New Exercise Log</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <label className="input-group-text">Username: </label>
          <select
            // ref={inputRef}
            required
            className="form-select"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text">Duration: </label>
          <input
            type="text"
            className="form-control"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text">Date: </label>
          <div>
            <DatePicker
              className="form-control"
              selected={date}
              onChange={(date) => setDate(date)}
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
