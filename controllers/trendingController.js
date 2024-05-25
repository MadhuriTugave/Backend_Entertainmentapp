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
// console.log(trendingItems)
const detailsPromises = trendingItems.map(async (item) => {
  const mediaType = item.media_type;
  const detailsUrl = `https://api.themoviedb.org/3/${mediaType}/${item.id}/external_ids?api_key=${apiKey}`;

  const detailsResponse = await fetch(detailsUrl);

  const detailsData = await detailsResponse.json();

  const imdbId = detailsData.imdb_id;
 

const collectionName = mediaType === "movie" ? "Movies" : "TVShow";

const collection = DB.collection(collectionName);
const namespace = collection.namespace;
const collectionParts = namespace.split('.');
const collectionname = collectionParts[1];
// console.log(collectionname)

const mediaDetails =collectionname === "Movies"? await  Movies.findOne({imdbId}): await TVShow.findOne({imdbId})



// let mediaDetails =[];
// if(collectionName === "Movies"){
//    const details = await Movies.findOne({imdbId});
//   console.log()
//   mediaDetails.push(details)
// }else{
//   const TVdetails = await TVShow.findOne({imdbId});

// mediaDetails.push(TVdetails)
// }
// console.log(mediaDetails)
return mediaDetails ? { ...mediaDetails, createdAt: new Date() } : null;
});


const fullDetails = (await Promise.all(detailsPromises)).filter(
    (details) => details !== null
  );

// console.log(fullDetails)
  const trendingCollection = DB.collection("Trending");
  await trendingCollection.deleteMany({});
  await trendingCollection.insertMany(fullDetails);
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
// console.log(trendingItems)
    res.json(trendingItems);
  } catch (error) {
    console.error("Error in getTrending:", error);
    res.status(500).json({ message: error.message });
  }
};


module.exports = { getTrending };