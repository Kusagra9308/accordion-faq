import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import questionRoutes from "./routes/questions.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.get("/test", (req, res) => {
  res.send("Server is alive");
});
app.get("/api/questions", (req, res) => {
  res.send("SERVER LEVEL ROUTE HIT");
});

app.use("/api/questions", questionRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
