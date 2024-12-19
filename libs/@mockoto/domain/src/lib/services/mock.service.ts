import { BaseService } from '@mockoto/common';
import { Request } from 'express';
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

  public async saveMocks(req: Request): Promise<boolean> {
    console.log(req.tenantId);
    console.log(req.body);
    const tenantId = req.tenantId;
    const groupId = req.body.groupId._id;
    const list = req.body.list as [];
    list.map((mock: any) => (mock.groupId = groupId));
    try {
      const model = await this.getTenantModel(tenantId);
      await model.insertMany(list);
      return Promise.resolve(true);
    } catch (error) {
      throw new Error(`Error fetching entities: ${error.message}`);
    }
  }
}
