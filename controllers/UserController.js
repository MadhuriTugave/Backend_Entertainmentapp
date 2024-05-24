const Users = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const KEY = process.env.JWT_SECRET_KEY;
const SignUp = async (req, res) => {
    try {
   
    const email = req.body.email;
      // Check if a user with the given email already exists
      const emailExists = await Users.findOne({ email: email });
      if (emailExists) {
        return res
          .status(409)
          .json({ success: false, message: "Email is already exists, Please Login" }); // 409 Conflict
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(req.body.password, 12);
 
 
      // Save the user to the database
      const userCreated = await Users.create({email:email,  password_hashed: hashedPassword});

      // Create a Response object to send back to the client with sensitive data excluded
      const responseUser = {
        _id: userCreated._id,
        email: email,
      };

      // Generate an access token for the newly created user
      const accessToken = jwt.sign(
        { _id: userCreated._id },
        KEY,
        {
          expiresIn: "1d",
        }
      );
  
      // Send the response back to the client
      res.status(201).json({
        success: true,
        message: "Successfully SignUp !!!",
        user: responseUser,
        access_token: accessToken,
        token_type: "Bearer",
        expiresIn: "3600",
      });
    } catch (err) {
      
      res.status(500).json({ success: false, message: "Error registering user" });
    }
  };
  
  const login = async (req, res) => {
    try {
   
   // Fetch the user with the given email or username
      const user = await Users.findOne({ email: req.body.email });
  
      // If user does not exist return 404 Not Found
      if (!user) {
        return res
          .status(404) // 404 Not Found
          .json({ success: false, message: "User does not exist please SignUp!!" });
      }
  
      // Check if the password is correct
      const isMatch = await bcrypt.compare(
        req.body.password,
        user.password_hashed
      );
  
      // If the password is incorrect return 401 Unauthorized
      if (!isMatch) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid password" }); // 401 Unauthorized
      }
  
      // Create a Response object to send back to the client with sensitive data excluded
      const responseUser = {
        _id: user._id,
        email: user.email,
      };
  
      // Generate an access token for the user
      const accessToken = jwt.sign({ _id: user._id }, KEY, {
        expiresIn: "1d",
      });
  
      // Send the response back to the client
      res.status(200).json({
        success: true,
        message: "Login successful.",
        user: responseUser,
        access_token: accessToken,
        token_type: "Bearer",
        expiresIn: "3600",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Error logging in" });
    }
  };
//for getting a user data 
  const getUser = async (req, res) => {
    try {
    const id = req.user.id;
      // Fetch the user with the given email or username
      const user = await Users.findOne(
        { _id: id },
       { password_hashed: 0 } 
      );
  
      // If user does not exist return 404 Not Found
      if (!user) {
        return res
          .status(404) // 404 Not Found
          .json({ success: false, message: "User does not exist" });
      } else {
        res.status(200).json({
          success: true,
          user: user,
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Error fetching user" });
    }
  };
  

  module.exports = { SignUp, login ,getUser};