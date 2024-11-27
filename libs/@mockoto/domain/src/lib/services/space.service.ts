import { ISpace, SPACE, SpaceDocument } from './../models/space';
import { BaseService } from '@mockoto/common';
import { spaceSchema } from '../models/space';
export class SpaceService extends BaseService<ISpace> {
  constructor() {
    super(SPACE, spaceSchema);
  }

  public async getAllSummary(req: any): Promise<SpaceDocument[]> {
    try {
      const model = await this.getTenantModel(req.tenantId);
      return model.find({});
    } catch (error) {
      throw new Error(`Error fetching entities: ${error.message}`);
    }
  }
}
