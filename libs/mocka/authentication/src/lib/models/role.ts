import { Schema, Document, model, Model } from 'mongoose';

export interface IRole {
  name: string;
  tasks: string[];
}

export interface RoleDocument extends IRole, Document {}

export interface RoleModel extends Model<RoleDocument> {}

const roleSchema = new Schema<RoleDocument>({
  name: { type: String, required: true, unique: true },
  tasks: [{ type: String, ref: 'Task' }],
});

const Role = model<RoleDocument, RoleModel>('Roles', roleSchema);

export default Role;
