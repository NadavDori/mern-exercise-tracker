let Exercise = require("../models/exercise.model");

// Get all exercises
const getExercises = (req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

// Get single exercise
const getSingleExercise = (req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

// Add exercise
const addExercise = (req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise
    .save()
    .then(() => res.json("New Exercise Added!"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

// Delete exercise
const deleteExercise = (req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise Deleted!"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

// Update exercise
const updateExercise = (req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise
        .save()
        .then(() => res.json("Exercise Updated!"))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

module.exports = {
  getExercises,
  getSingleExercise,
  addExercise,
  deleteExercise,
  updateExercise,
};
