import { Schema, Document, model, Model } from "mongoose";

export interface Mock {
    name: String;
    value: Object;
}

export interface MockDocument extends Mock, Document {};

export interface MockModel extends Model<MockDocument> {};

const mockSchema = new Schema<MockDocument>({
    name: { type: String, required: true},
    value: { type: Object, required: true},
});

const Mock = model<MockDocument, MockModel>("Mocks", mockSchema);

export default Mock;