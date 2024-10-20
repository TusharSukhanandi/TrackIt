import User from "../../Models/user.model.js";

const updateExercise = async (req, res) => {
   
      try {
        const { id } = req.params;
        const { exercises } = req.body;
    
        const updatedDocument = await User.findByIdAndUpdate(
          id,
          { exercises: exercises },
          { new: true }
        ).select("-password");
        return res.json(updatedDocument);

      } catch (err) {
        res.json(err);
      }
}

export default updateExercise