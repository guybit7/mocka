import { TenantManager } from '@mockoto/core';
import { ITenant, tenantSchema } from '../models';
export class TenantsService {
  readonly modelName = 'tenants';

  private tenantManager: TenantManager;

  constructor(tenantManager: TenantManager) {
    this.tenantManager = tenantManager;
  }

  /**
   * Fetches a tenant by name from the system database.
   * @param name The name of the tenant to find.
   * @returns The tenant document or null if not found.
   */
  async getTenantByName(name: string) {
    try {
      const systemTenantModel = await this.tenantManager.getModel('system', 'Tenant', tenantSchema, false);
      const tenantMetadata = await systemTenantModel.findOne({ name: name }).exec();
      return tenantMetadata;
    } catch (error) {
      console.error(`Error fetching tenant by name "${name}":`, error);
      throw error;
    }
  }

  async createTenant(tenantData: ITenant) {
    try {
      const systemTenantModel = await this.tenantManager.getModel('system', 'Tenant', tenantSchema, false);
      await systemTenantModel.create(tenantData);
    } catch (error) {
      console.error('Error creating tenant:', error);
      throw error;
    }
  }
}
