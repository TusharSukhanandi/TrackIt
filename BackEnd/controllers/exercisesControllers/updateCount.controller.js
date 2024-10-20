import Exercises from "../../Models/exercises.model.js";

const updateCounts = async (req, res) => {
    const data = req.body;
    const { date } = data;
    const { exercises } = data;
  
    const userId = req.userId;
  
    try {
      const updateCounts = await Exercises.findOneAndUpdate(
        { date, user: userId },
        { exercises: exercises },
        { new: true }
      );
  
    
      if (updateCounts) {
        return res.status(200).json(updateCounts);
      }
  
      const newExercises = await Exercises.create({
        user: userId,
        date: data.date,
        exercises: data.exercises,
      });
  
      return res.status(200).json(newExercises);
    } catch (err) {
      console.log("err at updateCounts", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  export default updateCounts