import Exercises from "../../Models/exercises.model.js";

// monthExerciseCounts

// this fetches exercise count initially, make it get after implementing userContext in FE

const exerciseCounts = async (req, res) => {

    const { user } = req.body;
    const { month } = req.body;
  
    const userId = req.userId;
  
    const previousMonth = month - 1;
  
    //updated
  
    try {
      const exercises = await Exercises.find({
        user: userId,
        "date.month": month,
      });
      const previousMonthExercises = await Exercises.find({
        user: userId,
        "date.month": previousMonth,
      });
  
      if (!exercises || !previousMonthExercises) {
        return res.status(500).json({ message: "Internal server error" });
      }
  
      res.status(200).json({ exercises, previousMonthExercises });
    } catch (err) {

      //old code
  
      // try {
      //   const exerciseCounts = await Exercises.find({ user, "date.month": month });
  
      //   if (!exerciseCounts) {
      //     return res.status(500).json({ message: "Internal server error" });
      //   }
  
      //   res.status(200).json({exerciseCounts});
      // }
      
      console.log("err at exerciseCounts", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

export default exerciseCounts
  