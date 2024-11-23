import { GroupDocument } from '../models';
import { Group } from '../models/group';
import { BaseService } from './base-service';

export class GroupService extends BaseService<GroupDocument> {
  constructor() {
    super(Group);
  }

  public async getAllBySpaceId(spaceId): Promise<GroupDocument[]> {
    try {
      console.log(spaceId);
      return await this.model.find({ spaceId }).select({ spaceId: 1, _id: 1, name: 1 });
    } catch (error) {
      throw new Error(`Error fetching entities: ${error.message}`);
    }
  }
}
