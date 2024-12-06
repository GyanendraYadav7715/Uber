const mongoose = require("mongoose");

// Connect to MongoDB
function connectToDb() {
  mongoose
    .connect(process.env.DB_CONNECT, {})
    .then(() => {
      console.log("Connected to the MongoDB database successfully!");
    })
    .catch((error) => {
      console.error("Error connecting to the MongoDB database:", error);
    });
}

module.exports = connectToDb;
