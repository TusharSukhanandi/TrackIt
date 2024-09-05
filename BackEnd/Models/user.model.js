import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  // date: { type: Date, required: true, default: Date.now},
  exercises: {
    type: [
      {
        exerciseName: { type: String, required: true },
        count: { type: Number, required: true, default: 0 },
      },
    ],
    default: [
      { exerciseName: "Push-Ups"},
      { exerciseName: "Sit-Ups" },
      { exerciseName: "Squats"},
    ],
  },
});

const User = mongoose.model("User", userSchema);
export default User;
