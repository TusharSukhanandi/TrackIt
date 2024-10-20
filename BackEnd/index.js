import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectToDatabase from "./db/connectToDatabase.js";
import path from "path";


const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000

app.use(
  cors({
    origin: process.env.CORS_ORIGIN_URL,
    methods: ["POST", "GET", "PUT"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const __dirname = path.resolve();

import authRoutes from "./routes/auth.route.js";
import exercisesRoutes from "./routes/exercise.route.js";

app.use("/auth", authRoutes);
app.use("/exercise", exercisesRoutes);


app.use(express.static(path.join(__dirname, "/FrontEnd-TrackIt/dist")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "FrontEnd-TrackIt", "dist", "index.html"))
})

app.listen(PORT, () => {
  connectToDatabase();
  console.log("sever is alive at", PORT);
});
