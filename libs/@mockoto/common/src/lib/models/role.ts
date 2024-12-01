import { Schema, Document, Model } from 'mongoose';

export const ROLE = 'Role';
export interface IRole {
  name: string;
  tasks: string[];
}

export interface RoleDocument extends IRole, Document {}

export type RoleModel = Model<RoleDocument>;

export const roleSchema = new Schema<RoleDocument>({
  name: { type: String, required: true, unique: true },
  tasks: [{ type: String, ref: 'Task' }],
});
