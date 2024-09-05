import express from "express";

const route = express.Router()

import signUp from "../controllers/authControllers/signUp.controller.js";
import logIn from "../controllers/authControllers/logIn.controller.js";
import logOut from "../controllers/authControllers/logOut.controller.js";

route.post("/signUp", signUp);
route.post("/logIn", logIn);
route.post("/logOut", logOut);

export default route