import { Space, SpaceDocument } from '../models/space';
import { BaseService } from './base-service';

export class SpaceService extends BaseService<SpaceDocument> {
  constructor() {
    super(Space);
  }

  public async getAllSummary(): Promise<SpaceDocument[]> {
    try {
      return await this.model.find().select({ name: 1, _id: 1 });
    } catch (error) {
      throw new Error(`Error fetching entities: ${error.message}`);
    }
  }
}
