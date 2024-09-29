import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectToDatabase from "./db/connectToDatabase.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res) => {
  res.json("Hello World!!");
});

import authRoutes from "./routes/auth.route.js";
import exercisesRoutes from "./routes/exercise.route.js";

app.use("/auth", authRoutes);
app.use("/exercise", exercisesRoutes);

app.listen(PORT, () => {
  connectToDatabase();
  console.log("sever is alive at", PORT);
});
