import { Schema, Document, Model } from 'mongoose';

export const TENANT = 'Tenant';
export interface ITenant {
  name: string;
  tenantSchema: string; // Renamed from `schema` to avoid conflict
  ownerEmail: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'inactive';
}

export interface TenantDocument extends Document, ITenant {}

export type TenantModel = Model<TenantDocument>;

export const tenantSchema = new Schema<TenantDocument, TenantModel>({
  name: { type: String, unique: true, required: true },
  tenantSchema: { type: String, required: true }, // Match renamed property
  ownerEmail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
});
