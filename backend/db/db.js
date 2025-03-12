const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}`
    );
    console.log(
      `\n Mongo DB connected  DB Host at : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Error while connecting mongoDB", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;