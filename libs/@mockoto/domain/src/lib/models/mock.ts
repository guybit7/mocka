import { Document, model, Model, Schema } from 'mongoose';

export const MOCK = 'Mock';
export interface IMock {
  name: string;
  value: any;
  groupId: string;
  status: boolean;
}

export interface MockDocument extends IMock, Document {}

export type MockModel = Model<MockDocument>;

export const mockSchema = new Schema<MockDocument>({
  name: { type: String, required: true },
  value: { type: Object, required: true },
  groupId: { type: String, required: true },
  status: { type: Boolean, default: true },
});

// Add a unique compound index
mockSchema.index({ groupId: 1, name: 1 }, { unique: true });

const Mock = model<MockDocument, MockModel>('Mocks', mockSchema);

export default Mock;
