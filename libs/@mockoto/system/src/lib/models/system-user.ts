import { Schema, Document, Model } from 'mongoose';

export const SYSTEM_USER = 'SystemUser';

export interface ISystemUser {
  tenantId: string;
  email: string;
  password: string;
  fullName: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
  isVerified: boolean;
}

export interface SystemUserDocument extends ISystemUser, Document {}

export type SystemUserModel = Model<SystemUserDocument>;

export const systemUserSchema = new Schema<SystemUserDocument>({
  tenantId: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isVerified: { type: Boolean, default: false },
});

systemUserSchema.pre('save', function (next) {
  if (this.isModified()) {
    this.updatedAt = new Date();
  }
  next();
});
