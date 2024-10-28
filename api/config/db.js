const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;
console.log(uri);

const connectDB = async () => {
  try {
    // Connect to the MongoDB cluster
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
