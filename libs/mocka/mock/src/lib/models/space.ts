import { Schema, Document, model, Model } from 'mongoose';

// Interface for the Space
export interface ISpace {
  name: string; // Name of the mock item Space
  description?: string; // Optional description of the Space
  createdAt?: Date; // Creation timestamp (optional)
  updatedAt?: Date; // Update timestamp (optional)
}

// Extend Document interface to include ISpace
export interface SpaceDocument extends ISpace, Document {}

// Extend Model interface for Space
interface SpaceModel extends Model<SpaceDocument> {}

// Define the Mongoose schema for Space
const spaceSchema = new Schema<SpaceDocument>(
  {
    name: { type: String, required: true }, // Required name field
    description: { type: String, required: false }, // Optional description field
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create the Space model
export const Space = model<SpaceDocument, SpaceModel>('Space', spaceSchema);

export default Space; // Ensure the model is exported
