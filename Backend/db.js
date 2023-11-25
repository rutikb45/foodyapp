const mongoose = require('mongoose');
const mongoURL = "mongodb://rohitsharma:Rohit45@ac-0ppvtqh-shard-00-00.e0qk37y.mongodb.net:27017,ac-0ppvtqh-shard-00-01.e0qk37y.mongodb.net:27017,ac-0ppvtqh-shard-00-02.e0qk37y.mongodb.net:27017/?ssl=true&replicaSet=atlas-13irew-shard-0&authSource=admin&retryWrites=true&w=majority";

const mongoConnect = async () => {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "GoFood", // Specify the database name here
    });
    console.log("Connected to MongoDB");

    const collection = await mongoose.connection.db.collection("food_items");
    const data = await collection.find({}).toArray();

    const foodCategoryCollection = await mongoose.connection.db.collection("foodCategory");
    const foodCategoryData = await foodCategoryCollection.find({}).toArray();

    global.food_items = data;
    global.foodCategory = foodCategoryData;

  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

module.exports = mongoConnect;
