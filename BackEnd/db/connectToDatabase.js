import mongoose from "mongoose"

const connectToDatabase = () => {
    try{
mongoose.connect(process.env.MONGODB_URI);
console.log("connected to database");

    }
    catch(error){
        console.log("error connecting mongoDB", error);
        
    }
}

export default connectToDatabase;