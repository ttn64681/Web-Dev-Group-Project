'use server'
import mongoose from "mongoose";

const  connectMongoDB = async (): Promise<void> => {
    try {
        console.log("Attempting to connect to MongoDB...");
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            console.error("MONGODB_URI is not defined in environment variables.");
            throw new Error("MONGODB_URI is not defined in environment variables.");
        }
        
        console.log("MongoDB URI found, connecting...");
        await mongoose.connect(uri);
        console.log("Connected to MongoDB.");
    } catch (error) {
        console.error("Error connecting to MongoDB:", (error as Error).message);
        throw error; // Re-throw the error to propagate it up
    }
};

export default connectMongoDB;
