let User = require("../models/user.model");

// Get all users
const getUsers = (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

// Get single user
const getSingleUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

// Add user
const addUser = (req, res) => {
  const username = req.body.username;
  const newUser = new User({ username });
  newUser
    .save()
    .then(() => res.json("New User Added!"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

// Delete user
const deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User Deleted!"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

// Update user
const updateUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      user.username = req.body.username;

      user
        .save()
        .then(() => res.json("User Updated!"))
        .catch((err) => res.status(400).json(`Error ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

module.exports = {
  getUsers,
  getSingleUser,
  addUser,
  deleteUser,
  updateUser,
};
