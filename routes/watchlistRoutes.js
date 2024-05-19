const express = require("express");
const watchlist = require("../controllers/watchlistController");

const watchlistRouters = express.Router();

// Get all watchlist
watchlistRouters.get("/", watchlist.getWatchlist);

// Get all watchlist with details
watchlistRouters.get("/:id", watchlist.getWatchlistDetails);

// Add a bookmark
watchlistRouters.post("/:id", watchlist.addToWatchlist);

// Delete a bookmark
watchlistRouters.delete("/:id", watchlist.deleteFromWatchlist);

// Export the bookmark routes
module.exports = watchlistRouters;