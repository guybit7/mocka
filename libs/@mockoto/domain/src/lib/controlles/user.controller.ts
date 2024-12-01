import { authMiddleware, UserService } from '@mockoto/authentication';
import { BaseController, IUser } from '@mockoto/common';
import { Request, Response, NextFunction } from 'express';

export class UserController extends BaseController<IUser> {
  constructor() {
    super(new UserService());
    this.initRoutes();
  }

  override initRoutes() {
    this.router.use(authMiddleware);
    super.initRoutes();
    this.router.post('/', this.create.bind(this)); // Ensure this is the correct binding of the method
  }

  // Make sure the signature matches the expected one from the base class
  override async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await (this.service as UserService).create(req.tenantId, req.body);
      res.status(200).json({ data: user });
    } catch (error) {
      next(error);
    }
  }
}
