import { TenantManager } from '@mockoto/core';

export class BaseService<T> {
  protected model: any;
  protected schema: any;

  constructor(model: any, schema: any) {
    this.model = model;
    this.schema = schema;
  }

  protected async getTenantModel(tenantId: string) {
    if (!tenantId) {
      throw new Error('Tenant ID is required [service]');
    }

    return TenantManager.getInstance().getModel(tenantId, this.model, this.schema);
  }

  async findAll(tenantId: string): Promise<T[]> {
    const model = await this.getTenantModel(tenantId);
    return model.find({});
  }

  async findById(tenantId: string, id: string): Promise<T | null> {
    const model = await this.getTenantModel(tenantId);
    return model.findById(id);
  }

  async findByName(tenantId: string, name: string): Promise<T | null> {
    const model = await this.getTenantModel(tenantId);
    return model.findOne({ name });
  }

  async create(tenantId: string, data: T): Promise<any> {
    const model = await this.getTenantModel(tenantId);
    return model.create(data);
  }

  async update(tenantId: string, id: string, data: Partial<T>): Promise<T | null> {
    const model = await this.getTenantModel(tenantId);
    return model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(tenantId: string, id: string): Promise<T | null> {
    const model = await this.getTenantModel(tenantId);
    return model.findByIdAndDelete(id);
  }

  async deleteAll(tenantId: string) {
    const model = await this.getTenantModel(tenantId);
    return await model.deleteMany({});
  }
}
