import { BaseService } from '@mockoto/common';
import { ISystemUser, SYSTEM_USER, systemUserSchema } from '../models/system-user';

export class SystemUserService extends BaseService<ISystemUser> {
  constructor() {
    super(SYSTEM_USER, systemUserSchema);
  }
}
