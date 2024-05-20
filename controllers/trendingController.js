const db = require("../DB");
const dotenv = require("dotenv");
const fetch = require("node-fetch");
const Movies = require("../models/Movie");
const TVShow =require("../models/Tv_show");

// Load environment variables from the .env file
dotenv.config();
const MongoClient = require('mongodb').MongoClient;
const uri =   process.env.MONGO_URL // Replace with your MongoDB URI
const client = new MongoClient(uri);

client.connect();

const DB = client.db('test');
// Helper function to check if the Trending collection needs an update
const needsUpdate = async () => {
  const trendingCollection = DB.collection("Trending");
  const latestEntry = await trendingCollection.findOne(
    {},
    { sort: { _id: -1 } }
  );

  if (!latestEntry) return true; // Collection is empty, needs update

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  return latestEntry.createdAt < oneWeekAgo; // Check if the latest entry is older than a week
};

// Helper function to fetch IMDb IDs from TMDB and update the Trending collection with details from Movies and Shows collections
const updateTrendingCollection = async () => {
  const trendingUrl = "https://api.themoviedb.org/3/trending/all/week";
  const apiKey = process.env.API_KEY;
  const trendingResponse = await fetch(`${trendingUrl}?api_key=${apiKey}`);
  const trendingData = await trendingResponse.json();
  const trendingItems = trendingData.results;
// console.log(trendingItems)

try {
  const trendingCollection =await DB.collection("Trending");
  // Validate data
  trendingItems.forEach((detail, index) =>{
    if (typeof detail !== 'object' || detail === null) {
      throw new Error(`Invalid data at index ${index}`);
    }
  });
      await trendingCollection.deleteMany({});
  const result =await trendingCollection.insertMany(trendingItems);
  // console.log(result);
} catch (error) {
  console.error("Error inserting documents:", error);
}




};


// Fetch trending movies and tv shows from the Trending collection
const getTrending = async (req, res) => {
  try {
    if (await needsUpdate()) {
      await updateTrendingCollection();
    }

    const trendingCollection = DB.collection("Trending");
    const trendingItems = await trendingCollection
      .find(
        {},
        {
        
            title: 1,
            bannerUrl: 1,
            releaseDate: 1,
            firstAirDate: 1,
            lastAirDate: 1,
            rated: 1,
            type: 1,
          
        }
      )
      .toArray();

    res.json(trendingItems);
  } catch (error) {
    console.error("Error in getTrending:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTrending };