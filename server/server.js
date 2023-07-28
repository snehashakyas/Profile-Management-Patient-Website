const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv").config();
const logger = require("./logger/logger");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 3000; // uses port number PORT in .env file or port number 3000 if PORT is not found

connectDB(); // connect to MongoDB database
const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

app.use("/api/patient", require("./routes/patientRoutes")); // when hitting api/patient, code will look into patientRoutes file
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler); // overwrites default express error handler

app.listen(port, () => logger.info(`Server started on port ${port}`));
