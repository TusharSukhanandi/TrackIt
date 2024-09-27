
import User from "../../Models/user.model.js"
import generateTokenAndSetToken from "../../utils/generateToken.js";
import bcrypt from "bcrypt";



const logIn = async (req, res) => {
    const { userName, password } = req.body;
    
    try {
      if (!userName || !password) {
        return res.status(400).json({ message: "all field are required" });
      }
  
      const user = await User.findOne({
        userName,
      });
  
      if (!user) {
        return res.status(400).json({ message: "user name or password is incorrect" });
      }
  
      const matchPassword = await bcrypt.compare(password, user.password);
  
      if (!matchPassword) {
        return res.status(400).json({ message:"user name or password is incorrect" });
      }
  
      generateTokenAndSetToken(user._id, res)
      user.password = undefined;
      user.exercises = undefined;
     console.log(user);
     
      return res.status(200).json({ message: "logged in", user });
  
    } catch (error) {
      console.log("err at log in", error);
  
      return res.status(500).json("Internal server error");
    }
}

export default logIn;