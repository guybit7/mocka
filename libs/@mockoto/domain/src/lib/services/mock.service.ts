import { BaseService } from '@mockoto/common';
import { IMock, MOCK, MockDocument, mockSchema } from '../models/mock';

export class MockService extends BaseService<IMock> {
  constructor() {
    super(MOCK, mockSchema);
  }

  public async findQuery(tenantId, groupId, endpoint): Promise<MockDocument> {
    try {
      const model = await this.getTenantModel(tenantId);
      const query = {
        name: endpoint,
        groupId: groupId,
      };
      return await model.findOne(query);
    } catch (error) {
      throw new Error(`Error fetching entities: ${error.message}`);
    }
  }
}
