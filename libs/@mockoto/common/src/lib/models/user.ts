import { Schema, Document, Model } from 'mongoose';
import { RoleDocument } from './role';

export const USER = 'User';
export interface IUser {
  email: string;
  password: string;
  fullName: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  role: RoleDocument['_id'];
  token: string;
  refreshToken: string;
  lastLogin: Date;
  isVerified: boolean;
}

export interface UserDocument extends IUser, Document {}

export type UserModel = Model<UserDocument>;

export const userSchema = new Schema<UserDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  role: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
  token: { type: String },
  refreshToken: { type: String },
  lastLogin: { type: Date },
  isVerified: { type: Boolean, default: false },
});
