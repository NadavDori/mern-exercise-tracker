import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ExerciseList() {
  const [exercises, setExercises] = useState([]);

  const deleteExercise = (id) => {
    axios
      .delete(`http://localhost:5000/exercises/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    const newExercises = exercises.filter((exercise) => exercise._id !== id);
    setExercises(newExercises);
  };

  const clearExercises = () => {
    exercises.map((exercise) => {
      return axios
        .delete(`http://localhost:5000/exercises/${exercise._id}`)
        .then((res) => console.log(res.data));
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises")
      .then((res) => {
        setExercises(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Description</th>
            <th scope="col">Duration</th>
            <th scope="col">Date</th>
            <th className="col-md-2 col-sm-3 col-3" scope="col">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise) => {
            return (
              <tr key={exercise._id}>
                <td>{exercise.username}</td>
                <td>{exercise.description}</td>
                <td>{exercise.duration}</td>
                <td>{exercise.date.substring(0, 10)}</td>
                <td>
                  <Link to={`/edit/${exercise._id}`}>edit</Link> |{" "}
                  <Link to="/" onClick={() => deleteExercise(exercise._id)}>
                    delete
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="d-grid col-3 mx-auto">
        {exercises.length > 0 ? (
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={clearExercises}
          >
            Clear All
          </button>
        ) : null}
      </div>
    </>
  );
}

export default ExerciseList;
