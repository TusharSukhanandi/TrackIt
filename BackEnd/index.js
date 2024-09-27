import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

import connectToDatabase from "./db/connectToDatabase.js";

// mongoose.connect("mongodb+srv://tusharsukhanandi:vsdCsX3d9a1JWkNR@cluster0.khkriy9.mongodb.net/TrackIt?retryWrites=true&w=majority&appName=Cluster0")
//   .then(() => {
//     console.log("MongoDB connected successfully");
//   })
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//   });

app.get("/", (req, res) => {
  res.json("Hello World!!");
});

import authRoutes from "./routes/auth.route.js";
import exercisesRoutes from "./routes/exercise.route.js";

app.use("/auth", authRoutes);
app.use("/exercise", exercisesRoutes);

app.listen(1111, () => {
  connectToDatabase();
  console.log("sever is alive at 1111");
});
