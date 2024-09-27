import express from "express";

const route = express.Router()

import getBlue from "../controllers/exercisesControllers/getBlue.controller.js";
import updateExercise from "../controllers/exercisesControllers/updateExercise.controller.js";
import exerciseCounts from "../controllers/exercisesControllers/exerciseCounts.controller.js";
import updateCounts from "../controllers/exercisesControllers/updateCount.controller.js";
import verifyToken from "../utils/verifyToken.js";

route.get("/getBlue/:id", verifyToken,  getBlue);
route.put("/update/:id",verifyToken, updateExercise);
route.post("/exerciseCounts",verifyToken, exerciseCounts);
route.put("/updateCounts",verifyToken, updateCounts);

export default route;