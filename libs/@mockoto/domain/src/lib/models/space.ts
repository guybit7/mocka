import { Schema, Document, Model } from 'mongoose';

export const SPACE = 'Space';

// Interface for the Space
export interface ISpace {
  name: string; // Name of the Space
  description?: string; // Optional description of the Space
  createdAt?: Date; // Creation timestamp (optional, set automatically by Mongoose)
  updatedAt?: Date; // Update timestamp (optional, set automatically by Mongoose)
}

// Extend Document interface to include ISpace
export interface SpaceDocument extends ISpace, Document {}

// Extend Model interface for Space
export type SpaceModel = Model<SpaceDocument>;

// Define the Mongoose schema for Space
export const spaceSchema = new Schema<SpaceDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: false }, // Optional description field
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// // Create the Space model
// export const SpaceModel = model<SpaceDocument, SpaceModel>('Space', spaceSchema);

// // Export the model for use in the application
// export default SpaceModel;
