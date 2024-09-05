import express from "express";

const route = express.Router()

import getBlue from "../controllers/exercisesControllers/getBlue.controller.js";
import updateExercise from "../controllers/exercisesControllers/updateExercise.controller.js";

route.get("/getBlue/:id", getBlue);
route.get("/update/:id", updateExercise);

export default route;