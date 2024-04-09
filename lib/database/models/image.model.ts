import { Schema, model, models } from "mongoose";

export interface IImage extends Document {
  title: string;
  transformationType: string;
  publicId: string;
  secureUrl: string;
  width?: number;
  height?: number;
  transformationUrl?: string;
  aspectRatio?: string;
  color?: string;
  prompt?: string;
  config?: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  author?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const ImageSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  transformationType: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  secureURL: {
    type: URL,
    required: true,
  },
  width: {
    type: Number,
  },
  height: {
    type: Number,
  },
  transformationURL: {
    type: URL,
  },
  aspectRatio: {
    type: String,
  },
  color: {
    type: String,
  },
  prompt: {
    type: String,
  },
  config: {
    type: Object,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Image = models.Image || model("Image", ImageSchema);

export default Image;
