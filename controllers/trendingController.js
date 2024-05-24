const db = require("../DB");
const dotenv = require("dotenv");
const fetch = require("node-fetch");
const Movies = require("../models/Movie");
const TVShow =require("../models/Tv_show");
const Movie = require("../models/Movie");

// Load environment variables from the .env file
dotenv.config();
const MongoClient = require('mongodb').MongoClient;
const uri =   process.env.MONGO_URL // Replace with your MongoDB URI
const client = new MongoClient(uri);

client.connect();

const DB = client.db('test');
const trendingCollection = DB.collection("Trending");
// Helper function to check if the Trending collection needs an update
const needsUpdate = async () => {
 
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
console.log(trendingItems)
const detailsPromises = trendingItems.map(async (item) => {
  const mediaType = item.media_type;
  const detailsUrl = `https://api.themoviedb.org/3/${mediaType}/${item.id}/external_ids?api_key=${apiKey}`;
//  console.log(detailsUrl)
  const detailsResponse = await fetch(detailsUrl);
  // console.log(detailsResponse)
  const detailsData = await detailsResponse.json();
  // console.log(detailsData)
  const imdbId = detailsData.imdb_id;
   console.log(imdbId)
  const collectionName = mediaType === "movie" ? "Movies" : "TVShow";
  console.log(collectionName)
 
  const collection = DB.collection(collectionName);
  const mediaDetails = await collection.findOne({imdbId});
console.log(mediaDetails,"......,,,,,,");
  return mediaDetails ? { ...mediaDetails, createdAt: new Date() } : null;
});


const fullDetails = (await Promise.all(detailsPromises)).filter(
    (details) => details !== null
  );

  const trendingCollection = DB.collection("Trending");
  // await trendingCollection.deleteMany({});
  // await trendingCollection.insertMany(fullDetails);
// console.log(fullDetails)
// try {
  
//   // Validate data
//   trendingItems.forEach((detail, index) =>{
//     if (typeof detail !== 'object' || detail === null) {
//       throw new Error(`Invalid data at index ${index}`);
//     }
//   });
 
//   //     await trendingCollection.deleteMany({});
//   // const result =await trendingCollection.insertMany(trendingItems);
//   console.log(result);
// } catch (error) {
//   console.error("Error inserting documents:", error);
// }




};

// updateTrendingCollection()
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

const getmediabyId =async (req,res)=>{
   try {
    const id = req.params.id;
    console.log(id)
    const data = await Movie.findOne(
      {imdbId:id},
      {
       title: 1,
        releaseDate: 1,
        rating: 1,
        summary: 1,
        genres: 1,
        runtime: 1,
        language: 1,
        posterUrl: 1,
        status: 1,
   });
    console.log(data)//tt15239678
   } catch (error) {
    console.log(error)
   }
}

module.exports = { getTrending ,getmediabyId};