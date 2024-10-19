import { GroupDocument } from '../models';
import { Group } from '../models/group';
import { BaseService } from './base-service';

export class GroupService extends BaseService<GroupDocument> {
  constructor() {
    super(Group);
  }
}
