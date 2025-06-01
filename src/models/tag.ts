import { Schema, model, Document } from "mongoose";

export interface Tag extends Document {
  name: string;
}

const TagSchema = new Schema<Tag>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export const TagModel = model<Tag>("Tag", TagSchema);
