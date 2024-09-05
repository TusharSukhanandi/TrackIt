import mongoose from "mongoose"

const connectToDatabase = () => {
    try{
mongoose.connect("mongodb://127.0.0.1:27017/Trackit");
console.log("connected to database");

    }
    catch(error){
        console.log("error connecting mongoDB", error);
        
    }
}

export default connectToDatabase;