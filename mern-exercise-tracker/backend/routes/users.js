const router = require("express").Router();

// Controllers
const {
  getUsers,
  getSingleUser,
  addUser,
  deleteUser,
  updateUser,
} = require("../controllers/users");

// Routes
router.route("/").get(getUsers);
router.route("/:id").get(getSingleUser);
router.route("/add").post(addUser);
router.route("/:id").delete(deleteUser);
router.route("/update/:id").put(updateUser);

module.exports = router;
