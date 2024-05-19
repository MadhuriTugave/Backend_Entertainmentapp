const express = require("express");
const {
  getTVShows,
  searchTVShows,
  getTVShow,
  getTVShowUrls,
  getTVShowCast,
} = require("../controllers/TvShowController");

// Initialize express router
const tvShowRoutes = express.Router();

// Get all tvShows
tvShowRoutes.get("/", getTVShows);

// Search for movies
tvShowRoutes.get("/search", searchTVShows);

// Get a movie by its ID
tvShowRoutes.get("/:id", getTVShow);

// Get URLs for a specific TV Show
tvShowRoutes.get("/:id/urls", getTVShowUrls);

// Get cast for a specific TV Show
tvShowRoutes.get("/:id/cast", getTVShowCast);

// Export the movie routes
module.exports = tvShowRoutes;