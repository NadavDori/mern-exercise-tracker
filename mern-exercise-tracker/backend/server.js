const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Routes
const exerciseRouter = require("./routes/exercises");
const userRouter = require("./routes/users");

// Init
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/exercises", exerciseRouter);
app.use("/users", userRouter);

// Connect to MongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Connected to MongoDB!");
});

// Start server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
