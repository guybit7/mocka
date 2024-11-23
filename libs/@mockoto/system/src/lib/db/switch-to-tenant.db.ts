import mongoose from 'mongoose';
import Tenant from '../models/tenant';
const MONGODB_URI = process.env.MONGO_URI; // mongodb://mocka-mongo:27017/mocka

// Function to switch to the tenant's specific database
export async function switchToTenantDatabase(tenantName: string) {
  try {
    const tenant = await Tenant.findOne({ name: tenantName }).exec();

    if (tenant) {
      const tenantDbName = tenant.name; // Example: Use the tenant's name as the database name

      // Dynamically connect to the tenant's specific database
      const tenantDb = mongoose.createConnection(
        `${MONGODB_URI}${tenantName}` // Use the tenant's database name
      );

      console.log(`Connected to tenant database: ${tenantDbName}`);
      return tenantDb;
    } else {
      console.error('Tenant not found!');
      return null;
    }
  } catch (error) {
    console.error('Error switching to tenant database:', error);
    return null;
  }
}
