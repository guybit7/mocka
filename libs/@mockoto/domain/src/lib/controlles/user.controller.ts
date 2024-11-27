import { authMiddleware, UserService } from '@mockoto/authentication';
import { BaseController, IUser } from '@mockoto/common';

export class UserController extends BaseController<IUser> {
  constructor() {
    super(new UserService());
    this.initRoutes();
  }

  override initRoutes() {
    this.router.use(authMiddleware);
    super.initRoutes();
  }
}
