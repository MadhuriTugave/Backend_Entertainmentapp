const express = require("express");
const SignUpCallback = require("../controllers/UserController");

const userRouters = express.Router();

// Create a new user
userRouters.post("/SignUp", SignUpCallback.SignUp);

// post a Login user
userRouters.post("/Login", SignUpCallback.login);

//get user details by id
userRouters.get("/:id", SignUpCallback.getUser);

// Export the user routes
module.exports = userRouters;