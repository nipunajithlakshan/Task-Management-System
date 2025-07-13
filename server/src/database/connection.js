import mongoose from "mongoose";

const connectDB = async () => {
    try {
       const MONGODB_URI = process.env.MONGODB_URI;
       await mongoose.connect(MONGODB_URI);
 
       const db = mongoose.connection;
 
       db.on("error", console.error.bind(console, "connection error: "));
       console.log("DB Connected successfully");
 
       db.once("open", function () {});
    } catch (error) {
       process.exit(1);
    }
 };
 
 export default connectDB;