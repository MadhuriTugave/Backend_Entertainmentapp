const express = require("express");
const trending = require("../controllers/trendingController");

// Initialize express router
const trendingRoutes = express.Router();

// Get all trendings
trendingRoutes.get("/", trending.getTrending);


// Export the trending routes
module.exports = trendingRoutes;