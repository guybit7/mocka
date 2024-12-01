import { BaseService, IRole, ROLE, roleSchema } from '@mockoto/common';
export class RoleService extends BaseService<IRole> {
  constructor() {
    super(ROLE, roleSchema);
  }
}
