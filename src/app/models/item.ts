import mongoose, { Schema, Document, Model } from 'mongoose';

interface Item extends Document {
  owner: string;
  title: string;
  description: string;
  url?: string;
}

const itemSchema = new Schema<Item>({
  owner: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  url: {
    type: String,
    required: false,
  },
});

const Item: Model<Item> = mongoose.models.Item || mongoose.model<Item>('Item', itemSchema);
export default Item;
