import { Model, Document } from 'mongoose';

export abstract class BaseService<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  public async create(body: Partial<T>): Promise<T | null> {
    try {
      return await this.model.create(body);
    } catch (error) {
      throw new Error(`Error creating entity: ${error.message}`);
    }
  }

  public async getAll(): Promise<T[]> {
    try {
      return await this.model.find();
    } catch (error) {
      throw new Error(`Error fetching entities: ${error.message}`);
    }
  }

  public async getById(id: string): Promise<T | null> {
    try {
      return await this.model.findById(id);
    } catch (error) {
      throw new Error(`Error fetching entity by ID: ${error.message}`);
    }
  }

  public async update(id: string, body: Partial<T>): Promise<T | null> {
    try {
      return await this.model.findByIdAndUpdate(id, body, { new: true });
    } catch (error) {
      throw new Error(`Error updating entity: ${error.message}`);
    }
  }

  public async delete(id: string): Promise<T | null> {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting entity: ${error.message}`);
    }
  }
}
