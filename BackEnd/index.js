import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"

const app = express();
dotenv.config()

app.use(
  cors({
    // origin : ["https://track-it-alpha-nine.vercel.app"],
    methods: ["POST", "GET", "PUT"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser())

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

import authRoutes from "./routes/auth.route.js"
import exercisesRoutes from "./routes/exercise.route.js";

app.use("/auth", authRoutes);
app.use("/exercise", exercisesRoutes)

import Exercises from "./Models/exercises.model.js";

app.post("/fullData", async (req, res) => {
  console.log("new counts updating");

  const data = req.body;
  const { date } = data;
  const { user } = data;
  const { exercises } = data;
  try {
    const check = await Exercises.find({ date, user });

    if (check.length == 0) {
      await Exercises.create({
        user: data.user,
        password: data.password,
        date: data.date,
        exercises: data.exercises,
      });
    } else {
      await Exercises.findOneAndUpdate(
        { date, user },
        { exercises: exercises }
      );
    }
    console.log("updated exe");
  } catch (err) {
    res.json(err);
  }
});

app.post("/all", async (req, res) => {
  const { user } = req.body;
  const { month } = req.body;

  try {
    if (user != "") {
      const check = await Exercises.find({ user, "date.month": month });
      res.json(check);
    }
  } catch (err) {
    res.json(err);
  }
});

app.listen(1111, () => {
  connectToDatabase()
  console.log("sever is alive");
});
