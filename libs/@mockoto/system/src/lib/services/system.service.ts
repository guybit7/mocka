import { connect } from '@mockoto/core';
import { Connection } from 'mongoose';
import { tenantSchema } from '../models';

const MONGODB_URI = process.env.MONGO_URI;

export class SystemService {
  private connection: Connection | null = null;

  async connect(): Promise<void> {
    try {
      if (!this.connection) {
        this.connection = await connect(`${MONGODB_URI}/system`);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.close();
      this.connection = null;
    }
  }

  isConnected(): boolean {
    return !!this.connection;
  }

  getModel(modelName: string) {
    if (!this.connection) {
      throw new Error('SystemService: Not connected to the system database.');
    }

    const schemaMap: Record<string, any> = {
      tenants: tenantSchema,
    };

    const schema = schemaMap[modelName];
    if (!schema) {
      throw new Error(`SystemService: Schema for model "${modelName}" not found.`);
    }

    return this.connection.model(modelName, schema);
  }
}
