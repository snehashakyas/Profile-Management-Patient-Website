const mongoose = require("mongoose");
const logger = require("../logger/logger");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI); // connect to MongoDB link
    logger.info(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    logger.info(error);
    process.exit(1); // exit process with failure
  }
};

module.exports = connectDB;
