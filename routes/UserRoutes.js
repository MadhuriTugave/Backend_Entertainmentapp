const express = require("express");
const SignUpCallback = require("../controllers/UserController");
const authenticateToken = require("../middleware/Authenticate")

const userRouters = express.Router();

// Create a new user
userRouters.post("/SignUp", SignUpCallback.SignUp);

// post a Login user
userRouters.post("/Login", SignUpCallback.login);

// Use the authenticateToken middleware to protect the /me endpoint
userRouters.use("/me", authenticateToken);

//get user details by id
userRouters.get("/me", SignUpCallback.getUser);



// Export the user routes
module.exports = userRouters;