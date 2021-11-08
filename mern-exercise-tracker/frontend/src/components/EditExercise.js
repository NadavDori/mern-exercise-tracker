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
  // const inputRef = useRef();

  // Form submit handler - Update exercise
  const handleSubmit = (e) => {
    e.preventDefault();

    const updateExercise = {
      username: exerciseInfo.username,
      description: exerciseInfo.description,
      duration: exerciseInfo.duration,
      date: exerciseInfo.date,
    };

    axios
      .put(`http://localhost:5000/exercises/update/${id}`, updateExercise)
      .then((res) => console.log(res.data))
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));

    // Reset exercise states
    setExerciseInfo({
      ...exerciseInfo,
      description: "",
      duration: "",
      date: new Date(),
    });
  };

  useEffect(() => {
    // Get exercise info to edit
    axios
      .get(`http://localhost:5000/exercises/${id}`)
      .then((res) => {
        setExerciseInfo({
          username: res.data.username,
          description: res.data.description,
          duration: res.data.duration,
          date: new Date(res.data.date),
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
      <h3 className="mb-3 mt-3">Create New Exercise Log</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <label className="input-group-text">Username: </label>
          <select
            // ref={inputRef}
            required
            className="form-select"
            value={exerciseInfo.username}
            onChange={(e) =>
              setExerciseInfo({ ...exerciseInfo, username: e.target.value })
            }
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
            value={exerciseInfo.description}
            onChange={(e) =>
              setExerciseInfo({ ...exerciseInfo, description: e.target.value })
            }
          />
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text">Duration: </label>
          <input
            type="text"
            className="form-control"
            value={exerciseInfo.duration}
            onChange={(e) =>
              setExerciseInfo({ ...exerciseInfo, duration: e.target.value })
            }
          />
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text">Date: </label>
          <div>
            <DatePicker
              className="form-control"
              selected={exerciseInfo.date}
              onChange={(date) =>
                setExerciseInfo({
                  ...exerciseInfo,
                  date: date,
                })
              }
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
