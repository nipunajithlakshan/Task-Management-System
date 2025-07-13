import dotEnv from "dotenv";

dotEnv.config();

const getEnvironment = () => {
   // If NODE_ENV is set, use it; otherwise, default to "local"
   const environment = process.env.NODE_ENV || "development";
   switch (environment) {
      case "local":
         return {
            
            PORT: process.env.PORT || 3001,
            MONGODB_URI: process.env.MONGODB_URI,
            
         };
      case "development":
         return {
            
            PORT: process.env.PORT || 3001,
            MONGODB_URI: process.env.MONGODB_URI,
           
         };
      case "staging":
         // Add staging environment configuration here
         return {
            // Add configuration for staging environment
         };
      default:
         return {};
   }
};

const config = getEnvironment();

export default config;