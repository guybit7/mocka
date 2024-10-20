import { GroupDocument } from '../models';
import { Space } from '../models/space';
import { BaseService } from './base-service';

export class SpaceService extends BaseService<GroupDocument> {
  constructor() {
    super(Space);
  }
}
