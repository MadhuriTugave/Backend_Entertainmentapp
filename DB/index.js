const mongoose = require("mongoose");
const uri = process.env.MONGO_URL
module.exports = connection = async ()=>{
 await mongoose.connect(uri, { authSource: "admin" },{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>{
   console.log("Connected to MongoDB");
  })
  .catch(err => console.log(err));
 }