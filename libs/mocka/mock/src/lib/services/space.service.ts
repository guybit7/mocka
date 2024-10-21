import { GroupDocument } from '../models';
import { Space } from '../models/space';
import { BaseService } from './base-service';

export class SpaceService extends BaseService<GroupDocument> {
  constructor() {
    super(Space);
  }

  public async getAllSummary(): Promise<GroupDocument[]> {
    try {
      return await this.model.find().select({ name: 1, _id: 1 });
    } catch (error) {
      throw new Error(`Error fetching entities: ${error.message}`);
    }
  }
}
