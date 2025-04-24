import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IUser extends Document {
  username: String;
  password: String;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;
