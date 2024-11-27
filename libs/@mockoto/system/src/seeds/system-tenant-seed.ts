import { development_tenant_1, development_tenant_2, TenantManager } from '@mockoto/core';
import mongoose from 'mongoose';
import { TenantsService } from '../lib/services/tenants.service';

/**
 * Seeds the system tenant in the system database.
 *
 * This function ensures that a system tenant exists in the database.
 * It checks if the system tenant (identified by `development_tenant`) is already present.
 * If not, it creates a new system tenant entry with default metadata.
 *
 * Dependencies:
 * - SystemService: Manages connection to the system database.
 * - TenantsService: Handles tenant-specific operations, such as retrieving and creating tenants.
 *
 * Steps:
 * 1. Connect to the system database using `SystemService`.
 * 2. Check if the system tenant already exists using `TenantsService`.
 * 3. If the system tenant does not exist, create it with default metadata.
 * 4. Log appropriate success or error messages.
 * 5. Close the database connection to release resources.
 *
 * Usage:
 * This function should be called during application initialization or as part of
 * database migration/seed scripts to ensure the presence of the system tenant.
 *
 * @async
 * @throws Will log and rethrow errors that occur during the database operations.
 */

export async function createSystemTenentSeed() {
  const tenantsService = new TenantsService(new TenantManager());

  try {
    const existingTenant = await tenantsService.getTenantByName(development_tenant_1);
    if (existingTenant) {
      console.log('The system tenant development_tenant_1 already exists!');
    } else {
      // Create the Tenant model for the system database
      await tenantsService.createTenant({
        name: development_tenant_1,
        tenantSchema: 'default',
        ownerEmail: 'guybiton1012@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'active',
      });

      console.log('System tenant development_tenant_1 created successfully');
    }

    const existingTenant2 = await tenantsService.getTenantByName(development_tenant_2);
    if (existingTenant2) {
      console.log('The system tenant development_tenant_2 already exists.');
    } else {
      // Create the Tenant model for the system database
      await tenantsService.createTenant({
        name: development_tenant_2,
        tenantSchema: 'default',
        ownerEmail: 'guybiton7p@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'active',
      });

      console.log('System tenant development_tenant_2 created successfully');
    }
  } catch (error) {
    console.error('Error creating default system:', error);
  } finally {
    // Close the database connection
    await mongoose.disconnect();
  }
}
