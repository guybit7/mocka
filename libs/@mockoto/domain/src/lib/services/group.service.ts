import { BaseService } from '@mockoto/common';
import { GroupDocument } from '../models';
import { GROUP, groupSchema, IGroup } from '../models/group';

export class GroupService extends BaseService<IGroup> {
  constructor() {
    super(GROUP, groupSchema);
  }

  public async getAllBySpaceId(tenantId, spaceId): Promise<GroupDocument[]> {
    try {
      const model = await this.getTenantModel(tenantId);
      return await model.find({ spaceId }).select({ spaceId: 1, _id: 1, name: 1 });
    } catch (error) {
      throw new Error(`Error fetching entities: ${error.message}`);
    }
  }
}
