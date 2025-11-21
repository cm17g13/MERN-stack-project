import mongoose from "mongoose"

export const connectDB = async () => { 
    try {
        //console.log(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
        process.exit(1);
    }
}

//uKWCJ3TCeWaoZFsa
//mongodb+srv://callummcgregor50_db_user:uKWCJ3TCeWaoZFsa@cluster0.hcoqgcb.mongodb.net/?appName=Cluster0