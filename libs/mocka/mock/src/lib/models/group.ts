import { Schema, Document, model, Model } from 'mongoose';

// Interface for the Group
export interface IGroup {
  name: string; // Name of the mock item group
  description?: string; // Optional description of the group
  createdAt?: Date; // Creation timestamp (optional)
  updatedAt?: Date; // Update timestamp (optional)
}

// Extend Document interface to include IGroup
export interface GroupDocument extends IGroup, Document {}

// Extend Model interface for Group
interface GroupModel extends Model<GroupDocument> {}

// Define the Mongoose schema for Group
const groupSchema = new Schema<GroupDocument>(
  {
    name: { type: String, required: true }, // Required name field
    description: { type: String, required: false }, // Optional description field
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create the Group model
export const Group = model<GroupDocument, GroupModel>('Group', groupSchema);

export default Group; // Ensure the model is exported
