const express = require("express");
const SignUpCallback = require("../controllers/UserController");

const userRouters = express.Router();

// Create a new user
userRouters.post("/SignUp", SignUpCallback.SignUp);
userRouters.post("/Login", SignUpCallback.login);
userRouters.get("/:id", SignUpCallback.getUser);

// Export the user routes
module.exports = userRouters;