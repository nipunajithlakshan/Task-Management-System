import dotEnv from "dotenv";
dotEnv.config();
import app from "./app.js";
import config from "./config/index.js";
import connectDB from "./database/connection.js";


const PORT = config.PORT || 3001;

async function startServer() {
    try {
       // Connect to the database
       await connectDB();
 
    //    // Seed necessary data
    //    await seedInitialData();
 
       app.listen(PORT, () => {
          console.log(`Service Running On Port ${PORT}`);
       });
    } catch (error) {
       console.error("Error starting server:", error);
    }
 }
 
 startServer();
