import mongoose from "mongoose";

const allExercisesSchema = new mongoose.Schema({
    exerciseName: { type: String, required: true },
    count: { type: Number, required: true, default : 0 },
})

const exercisesSchema = new mongoose.Schema({
   user : {
    type : mongoose.Schema.Types.ObjectId,
   },
    date : {
        day : {type : Number, require : true},
        month : {type : Number, require : true},
        year : {type : Number, require : true}
    },
    exercises : [allExercisesSchema]

})

const Exercises = mongoose.model("Exercise", exercisesSchema)
export default Exercises;