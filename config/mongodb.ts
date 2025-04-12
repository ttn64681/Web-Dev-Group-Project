import mongoose from "mongoose";

const connectMongoDB = async (): Promise<void> => {
 console.log("Connect function called!")
 try {
  const path = require('path');
  const fileRelativeToCwd = './config/db.js';
  const absolutePath = path.resolve(process.cwd(), fileRelativeToCwd);
  console.log(absolutePath);
    //Processes the URI (Connection string)
   const uri = process.env.MONGODB_URI;

   if (!uri) {
     throw new Error("MONGODB_URI is not defined in environment variables.");
   }

   //Connects to mongoDB via Mongoose with the connection string in .env
   await mongoose.connect(uri);
   console.log("Connected to MongoDB.");
 } catch (error) {
   console.log("Error connecting to MongoDB:", (error as Error).message);
 }
};

export default connectMongoDB;
