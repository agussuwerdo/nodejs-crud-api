import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());

// Build the MongoDB URI
const mongoHost = process.env.MONGO_HOST || "localhost";
const mongoPort = process.env.MONGO_PORT || "27017";
const mongoDB = process.env.MONGO_DB || "test";
const mongoUser = process.env.MONGO_USER || "";
const mongoPass = process.env.MONGO_PASS || "";

// Connect to MongoDB
let mongoURI = `mongodb://${mongoUser}:${mongoPass}@${mongoHost}:${mongoPort}/${mongoDB}?authSource=admin`;
if (process.env.MONGO_HOST?.toLowerCase() !== "localhost") {
  mongoURI = `mongodb+srv://${mongoUser}:${mongoPass}@${mongoHost}/${mongoDB}?retryWrites=true&w=majority`;
}
mongoose
  .connect(mongoURI, {
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS,
  })
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

// Set up routes
app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
