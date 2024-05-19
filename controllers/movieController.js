const Movies = require("../models/Movie");
const ObjectId = require("mongoose").Types.ObjectId;

// Get all movies
const getMovies = async (req, res) => {
  try {
    // Define offset
    const offset = req.query.page ? (parseInt(req.query.page) - 1) * 20 : 0;

    // Fetch the Movies collection from the database
    // const Movies = await db.collection("Movies");

    // Fetch all movies
    const movies = await Movies.find({},{ projection: { title: 1, bannerUrl: 1, releaseDate: 1, type: 1 } }).skip(offset).limit(20);

    // If no movies are found return 404 Not Found
    if (movies.length === 0) {
      return res.status(404).json({ message: "No movies found" });
    }

    // Send the movies back to the client
    res.json(movies);
  } catch (err) {
    // Log the error and send 500 Server Error
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Search for movies
const searchMovies = async (req, res) => {
  try {
    // Fetch the query parameter from the request
    const { query } = req.query;

    // Fetch the Movies collection from the database
    const Movies = await db.collection("Movies");

    // Search for movies with the given query
    const movies = await Movies.find(
      {
        title: { $regex: new RegExp(query, "i") },
      },
      { projection: { title: 1, bannerUrl: 1, releaseDate: 1, type: 1 } }
    )
      .limit(20);

    // If no movies are found return 404 Not Found
    if (movies.length === 0) {
      return res.status(404).json({ message: "No movies found" });
    }

    // Send the movies back to the client
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a movie by its ID
const getMovie = async (req, res) => {
  try {
    // Fetch the Movies collection from the database
    const Movies = await db.collection("Movies");

    // Fetch the movie with the given ID
    const movie = await Movies.findOne(
      { _id: new ObjectId(req.params.id) },
      {
        projection: {
          title: 1,
          releaseDate: 1,
          rating: 1,
          summary: 1,
          genres: 1,
          runtime: 1,
          language: 1,
          posterUrl: 1,
          status: 1,
        },
      }
    );

    // If movie does not exist return 404 Not Found
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Send the movie back to the client
    res.json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get URLs for the movie
const getMovieUrls = async (req, res) => {
  try {
    // Fetch the Movies collection from the database
    const Movies = await db.collection("Movies");

    // Fetch the movie with the given ID
    const movie = await Movies.findOne(
      { _id: new ObjectId(req.params.id) },
      {
        projection: {
          homepage: 1,
          trailerUrl: 1,
          imdbUrl: {
            $cond: {
              if: { $eq: ["$imdbId", ""] }, // Check if imdbId exists and is not empty
              then: 0, // If imdbId is empty, return an empty string for imdbUrl
              else: { $concat: ["https://www.imdb.com/title/", "$imdbId"] }, // If imdbId exists, concatenate the URL
            },
          },
        },
      }
    );

    // If movie does not exist return 404 Not Found
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Send the URLs back to the client
    res.json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Cast for the movie
const getMovieCast = async (req, res) => {
  try {
    // Fetch the Movies collection from the database
    const Movies = await db.collection("Movies");

    // Fetch the movie with the given ID
    const movie = await Movies.findOne(
      { _id: new ObjectId(req.params.id) },
      {
        projection: {
          cast: 1,
        },
      }
    );

    // If movie does not exist return 404 Not Found
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Send the cast back to the client
    res.json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Export the movie controller
module.exports = {
  getMovies,
  searchMovies,
  getMovie,
  getMovieUrls,
  getMovieCast,
};