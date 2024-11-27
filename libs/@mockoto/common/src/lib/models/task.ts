import { Document, Schema } from 'mongoose';

export interface ITask {
  taskId: string;
  description: string;
}

export interface TaskDocument extends ITask, Document {}

export const taskSchema = new Schema<TaskDocument>({
  taskId: { type: String, required: true, unique: true },
  description: { type: String },
});
