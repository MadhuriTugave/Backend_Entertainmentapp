const mongoose = require("mongoose");

// Define the User Schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password_hashed: {
    type: String,
    required: true,
  },
  watchlist: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      type: {
        type: String,
        required: true,
        enum: ["Movie", "TVShow"],
      },
    },
  ],
});

// Export the User model
const User = mongoose.model("User", UserSchema);

module.exports = User;