const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connection = require("./DB/index");
const userRouters = require("./routes/UserRoutes");
const watchlistRouters = require("./routes/watchlistRoutes")
const authenticateToken = require("./middleware/Authenticate");
const trendingRoutes = require("./routes/trendingRoutes");
const movieRoutes = require("./routes/MovieRoutes");
const tvShowRoutes = require("./routes/tvShowRoutes");


//Middlewares;
app.use(cors());
app.use(express.json());

// MongoDB Connection
connection();

app.get("/", (req, res) => {
    res.send("Hello World!");
  });



// Use the user routes for the /user endpoint
  app.use("/user", userRouters);

// Use the authenticateToken middleware to protect the /movie, /tvshow and /watchlist endpoints
app.use("/watchlist", authenticateToken);

// Use the movie routes for the /movie endpoint
app.use("/movies", movieRoutes);

// Use the tv show routes for the /tvshow endpoint
app.use("/tvshows", tvShowRoutes);

// Use the watchlist routes for the /watchlist endpoint
app.use("/watchlist", watchlistRouters);

// Trending movies and tv shows
app.use("/trending", trendingRoutes);

  
const PORT =process.env.PORT|| 3000;
app.listen(PORT ,()=>{
    console.log(`Server is running on port ${PORT}`);
})



