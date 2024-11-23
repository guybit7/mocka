import { Schema, Document, model } from 'mongoose';

export interface ITask {
  taskId: string;
  description: string;
}

export interface TaskDocument extends ITask, Document {}

const taskSchema = new Schema<TaskDocument>({
  taskId: { type: String, required: true, unique: true },
  description: { type: String },
});

const Task = model<TaskDocument>('Task', taskSchema);

export default Task;
