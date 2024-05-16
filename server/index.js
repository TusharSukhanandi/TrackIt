const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors(
  {
    origin : ["https://track-it-alpha-nine.vercel.app"],
    methods: ["POST", "GET", "PUT"],
    credentials: true
  }
));
app.use(express.json());

app.listen(() => {
  console.log("sever is alive");
});

const bluePrintExercisesModel = require("./Models/loadExercises");
const exercisesModel = require("./Models/exercises");

// mongoose.connect("mongodb://127.0.0.1:27017/Trackit");

mongoose.connect("mongodb+srv://tusharsukhanandi:vsdCsX3d9a1JWkNR@cluster0.khkriy9.mongodb.net/TrackIt?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });


app.get("/", (req, res) => {
  res.json("Hello World!!")
})

app.post("/auth", async (req, res) => {
  const { user, password } = req.body;
  try {
    const isUser = await bluePrintExercisesModel.findOne({
      user: user,
      password: password,
    });
    if (isUser) {
      res.json(isUser);
    } else {
      res.json({ message: "user not found" });
    }
  } catch (err) {
    res.json(err);
  }
});

app.post("/create", async (req, res) => {
  const { user, password } = req.body;
  try {
    const isUser = await bluePrintExercisesModel.findOne({
      user: user,
      password: password,
    });

    const userName = await bluePrintExercisesModel.findOne({
      user: user,
    });
    if (!userName) {
      if (!isUser) {
        const newUser = await bluePrintExercisesModel.create({
          user: `${user}`,
          password: `${password}`,
          exercises: [
            { exerciseName: "pull ups", count: 0 },
            { exerciseName: "push ups", count: 0 },
            { exerciseName: "squats", count: 0 },
          ],
        });
        res.json(newUser);
      } else {
        res.json({ message: "user found", user: isUser });
      }
    } else {
      res.json({ message: "user name found", user: userName });
    }
  } catch (err) {
    res.json(err);
  }
});

app.get("/getBlue/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const document = await bluePrintExercisesModel.findById(id);
    res.json(document);
  } catch (err) {
    res.json(err);
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { exercises } = req.body;

    const updatedDocument = await bluePrintExercisesModel.findByIdAndUpdate(
      id,
      { exercises: exercises }
    );
    res.json(updatedDocument);
  } catch (err) {
    res.json(err);
  }
});

app.post("/fullData", async (req, res) => {
  const data = req.body;
  const { date } = data;
  const { user } = data;
  const { exercises } = data;
  try {
    const check = await exercisesModel.find({ date, user });

    if (check.length == 0) {
      await exercisesModel.create({
        user: data.user,
        password: data.password,
        date: data.date,
        exercises: data.exercises,
      });
    } else {
      await exercisesModel.findOneAndUpdate(
        { date, user },
        { exercises: exercises }
      );
    }
  } catch (err) {
    res.json(err);

  }
});

app.post("/all", async (req, res) => {
  const { user } = req.body;
  const { month } = req.body;
  console.log(user);
  try {
    if (user != "") {
      const check = await exercisesModel.find({ user, "date.month": month });
      // console.log(check)
      res.json(check);
    }
  } catch (err) {
    res.json(err);
  }
});
