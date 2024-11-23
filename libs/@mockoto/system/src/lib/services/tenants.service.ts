import { ITenant } from '../models';
import { SystemService } from './system.service';

export class TenantsService {
  readonly modelName = 'tenants';
  constructor(private readonly systemService: SystemService) {}

  /**
   * Fetches a tenant by name from the system database.
   * @param name The name of the tenant to find.
   * @returns The tenant document or null if not found.
   */
  async getTenantByName(name: string) {
    try {
      const tenantsModel = this.systemService.getModel(this.modelName);
      const existingTenant = await tenantsModel.findOne({ name });
      return existingTenant;
    } catch (error) {
      console.error(`Error fetching tenant by name "${name}":`, error);
      throw error;
    }
  }

  async createTenant(tenantData: ITenant) {
    try {
      if (!this.systemService.isConnected()) {
        await this.systemService.connect();
      }

      const tenantsModel = this.systemService.getModel('tenants');
      await tenantsModel.create(tenantData);
    } catch (error) {
      console.error('Error creating tenant:', error);
      throw error;
    }
  }
}
