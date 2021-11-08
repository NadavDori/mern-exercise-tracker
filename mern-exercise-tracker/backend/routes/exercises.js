const router = require("express").Router();

// Controllers
const {
  getExercises,
  getSingleExercise,
  addExercise,
  deleteExercise,
  updateExercise,
} = require("../controllers/exercises");

// Routes
router.route("/").get(getExercises);
router.route("/:id").get(getSingleExercise);
router.route("/add").post(addExercise);
router.route("/:id").delete(deleteExercise);
router.route("/update/:id").put(updateExercise);

module.exports = router;
