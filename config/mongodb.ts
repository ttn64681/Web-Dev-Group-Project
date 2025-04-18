'use server'
import mongoose from "mongoose";

const  connectMongoDB = async (): Promise<void> => {
    try {
        const uri = process.env.NEXT_PUBLIC_MONGODB_URI; //To use this make sure your .env file has NEXT_PUBLIC_MONGODB_URI, as that is the value it is searching for
        if (!uri) {
            throw new Error("MONGODB_URI is not defined in environment variables.");
        }

        await mongoose.connect(uri);
        console.log("Connected to MongoDB.");
    } catch (error) {
        console.log("Error connecting to MongoDB:", (error as Error).message);
    }
};

export default connectMongoDB;
