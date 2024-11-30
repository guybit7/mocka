import { TenantManager } from '@mockoto/core';
import { Model, Schema } from 'mongoose';

export class BaseService<T> {
  protected model: string;
  protected schema: Schema;

  constructor(model: string, schema: Schema) {
    this.model = model;
    this.schema = schema;
  }

  protected async getTenantModel(tenantId: string): Promise<Model<T>> {
    if (!tenantId) {
      throw new Error('Tenant ID is required');
    }

    return TenantManager.getInstance().getModel(tenantId, this.model, this.schema);
  }

  async findAll(tenantId: string): Promise<T[]> {
    return (await this.getTenantModel(tenantId)).find({});
  }

  async findById(tenantId: string, id: string): Promise<T | null> {
    return (await this.getTenantModel(tenantId)).findById(id);
  }

  async findByName(tenantId: string, name: string): Promise<T | null> {
    return (await this.getTenantModel(tenantId)).findOne({ name });
  }

  async create(tenantId: string, data: T): Promise<T> {
    return (await this.getTenantModel(tenantId)).create(data);
  }

  async update(tenantId: string, id: string, data: Partial<T>): Promise<T | null> {
    return (await this.getTenantModel(tenantId)).findByIdAndUpdate(id, data, { new: true });
  }

  async delete(tenantId: string, id: string): Promise<T | null> {
    return (await this.getTenantModel(tenantId)).findByIdAndDelete(id);
  }

  async deleteAll(tenantId: string) {
    return await (await this.getTenantModel(tenantId)).deleteMany({});
  }
}
