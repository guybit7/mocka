import { BaseService, IUser, USER, userSchema } from '@mockoto/common';

export class UserService extends BaseService<IUser> {
  constructor() {
    super(USER, userSchema);
  }
}
