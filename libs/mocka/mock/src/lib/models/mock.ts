import { Schema, Document, model, Model } from 'mongoose';

export interface IMock {
  name: String;
  value: Object;
  groupId: String;
}

export interface MockDocument extends IMock, Document {}

export interface MockModel extends Model<MockDocument> {}

const mockSchema = new Schema<MockDocument>({
  name: { type: String, required: true },
  value: { type: Object, required: true },
  groupId: { type: String, required: true },
});

const Mock = model<MockDocument, MockModel>('Mocks', mockSchema);

export default Mock;
