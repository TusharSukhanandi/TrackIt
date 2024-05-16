const mongoose = require("mongoose");

const allExercisesSchema = new mongoose.Schema({
    exerciseName: { type: String, required: true },
    count: { type: Number, required: true, default : 0 },
})

const exercisesSchema = new mongoose.Schema({
    user: { type: String, required: true },
    password :  { type: String, required: true },
    date : {
        day : {type : Number, require : true},
        month : {type : String, require : true},
        year : {type : Number, require : true}
    },
    exercises : [allExercisesSchema]

})

const exercisesModel = mongoose.model("exercises", exercisesSchema)
module.exports = exercisesModel