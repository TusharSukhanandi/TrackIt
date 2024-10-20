import generateTokenAndSetToken from "../../utils/generateToken.js";
import User from "../../Models/user.model.js";
import bcrypt from "bcrypt";

const signUp = async (req, res) => {
    
    const { userName, password } = req.body;

    
    try {
      if (!userName || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const user = await User.findOne({
        userName,
      });
  
      if (user) {
        return res.status(400).json({ message: "username is taken" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      if (!hashedPassword) {
        return res.status(500).json({ message: "Internal server error" });
      }
  
      const newUser = await User.create({
        userName,
        password: hashedPassword,
      });

      if(!newUser){
        return res.status(500).json({ message: "Internal server error" });
      }

      generateTokenAndSetToken(newUser._id, res)
newUser.password = undefined
newUser.exercises = undefined
      
      return res.status(201).json(newUser);

    } catch (err) {
      res.json(err);
    }
  };
  

export default signUp