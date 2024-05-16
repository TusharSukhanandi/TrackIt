const mongoose = require("mongoose");

const exercisesSchema = new mongoose.Schema({
    exerciseName: { type: String, required: true },
    count: { type: Number, required: true, default : 0 },
})

const bluePrintExercisesSchema = new mongoose.Schema({
    user: { type: String, required: true },
    password :  { type: String, required: true },
    // date: { type: Date, required: true, default: Date.now},
    exercises : [exercisesSchema]

})

const bluePrintExercisesModel = mongoose.model("bluePrintExercises", bluePrintExercisesSchema)
module.exports = bluePrintExercisesModel