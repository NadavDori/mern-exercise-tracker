import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import ExerciseList from "./components/ExerciseList";
import CreateExercise from "./components/CreateExercise";
import EditExercise from "./components/EditExercise";
import CreateUser from "./components/CreateUser";
import UserList from "./components/UserList";
import EditUser from "./components/EditUser";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<ExerciseList />} />
          <Route path="/edit/:id" element={<EditExercise />} />
          <Route path="/user/:id" element={<EditUser />} />
          <Route path="/create" element={<CreateExercise />} />
          <Route path="/user" element={<CreateUser />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
