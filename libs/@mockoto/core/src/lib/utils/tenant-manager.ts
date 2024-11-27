import mongoose, { Model, Schema } from 'mongoose';
const MONGODB_URI = process.env.MONGO_URI; // mongodb://mocka-mongo:27017/mocka

export class TenantManager {
  private static instance: TenantManager;
  private connections = new Map<string, mongoose.Connection>();
  private models = new Map<string, Map<string, Model<any>>>();

  /**
   * Singleton Instance
   */
  public static getInstance(): TenantManager {
    if (!TenantManager.instance) {
      TenantManager.instance = new TenantManager();
    }
    return TenantManager.instance;
  }

  // Get or create a connection for the given tenant
  public async getConnection(tenantDbName: string): Promise<mongoose.Connection> {
    let connection = this.connections.get(tenantDbName);

    // If there's no connection or it's disconnected, create a new one
    if (!connection || connection.readyState === 0) {
      // `0` means disconnected in mongoose
      connection = await mongoose.createConnection(`${MONGODB_URI}/${tenantDbName}`, {
        maxPoolSize: 10, // Maximum connections in the pool
        minPoolSize: 1, // Minimum connections to maintain
        serverSelectionTimeoutMS: 5000, // Connection timeout
        socketTimeoutMS: 45000, // Idle socket timeout
      });

      connection.on('connected', () => console.log(`Connected to ${tenantDbName}`));
      connection.on('error', err => console.error(`Connection error for ${tenantDbName}:`, err));
      connection.on('disconnected', () => console.log(`Disconnected from ${tenantDbName}`));

      this.connections.set(tenantDbName, connection);
    }

    return connection;
  }

  public async getModel<T>(tenantDbName: string, modelName: string, schema: Schema, cache = false): Promise<Model<T>> {
    // Ensure a valid connection

    const sanitizedDbName = TenantManager.sanitizeTenantDbName(tenantDbName);

    const connection = await this.getConnection(sanitizedDbName);

    // Initialize tenant models map if needed
    if (!this.models.has(tenantDbName)) {
      this.models.set(tenantDbName, new Map());
    }

    const tenantModels = this.models.get(tenantDbName);

    // Check if the model is already cached
    let model = tenantModels.get(modelName);

    if (!model) {
      // Create a new model if not cached
      model = connection.model<T>(modelName, schema);

      // Cache the model if the cache flag is enabled
      if (cache) {
        tenantModels.set(modelName, model);
      }
    }

    return model;
  }

  /**
   * Close all connections gracefully.
   */
  public async closeAllConnections(): Promise<void> {
    const closePromises = Array.from(this.connections.values()).map(connection => connection.close());
    await Promise.all(closePromises);
    console.log('All tenant connections closed.');
  }

  /**
   * Prevents database injection attacks or the introduction of malicious characters that could affect the connection string.
   */
  private static sanitizeTenantDbName(tenantDbName: string): string {
    // Only allow alphanumeric characters, underscores, and hyphens
    const sanitizedDbName = tenantDbName.replace(/[^a-zA-Z0-9_-]/g, '');

    // Ensure that the database name is not empty
    if (!sanitizedDbName) {
      throw new Error('Invalid tenant database name: Database name cannot be empty or contain invalid characters.');
    }

    return sanitizedDbName;
  }
}

export default TenantManager;
