import mongoose, { Document, Schema, Model } from 'mongoose';

export interface UserTemplate extends Document {
  username: String;
  password: String;
}

const UserSchema = new Schema<UserTemplate>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User: Model<UserTemplate> =
  mongoose.models.User || mongoose.model<UserTemplate>('User', UserSchema);

export default mongoose.models.User || mongoose.model<UserTemplate>('User', UserSchema);
