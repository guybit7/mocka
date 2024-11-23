import { Request, Response } from 'express';
import { SpaceService } from '../services';
import { BaseController } from './base.controller';
import { authMiddleware, RbacMiddleware } from '@mockoto/authentication';
export class SpaceController extends BaseController<any> {
  constructor() {
    super(new SpaceService());
    // this.router.use(authMiddleware);
    this.router.get(
      '/summary/getAll',
      [authMiddleware, RbacMiddleware.checkPermission('read_space')],
      this.getAllSummary.bind(this)
    );
    super.initRoutes();
  }

  protected async getAllSummary(req: Request, res: Response) {
    try {
      const result = await (this.service as SpaceService).getAllSummary();
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
