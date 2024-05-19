const express = require("express");
const {
  getMovies,
  searchMovies,
  getMovie,
  getMovieUrls,
  getMovieCast,
} = require("../controllers/movieController");

// Initialize express router
const movieRoutes = express.Router();

// Get all movies
movieRoutes.get("/", getMovies);

// Search for movies
movieRoutes.get("/search", searchMovies);

// Get a movie by its ID
movieRoutes.get("/:id", getMovie);

// Get URLs for a specific movie
movieRoutes.get("/:id/urls", getMovieUrls);

// Get cast for a specific movie
movieRoutes.get("/:id/cast", getMovieCast);

// Export the movie routes
module.exports = movieRoutes;