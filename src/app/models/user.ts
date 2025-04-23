import mongoose, {Schema, Document, Model } from "mongoose";

interface UserTemplate extends Document {
    username: string;
    password: string;
}

const userSchema = new Schema<UserTemplate>({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User: Model<UserTemplate> = mongoose.models.User || mongoose.model<UserTemplate>("User", userSchema);

export default User;