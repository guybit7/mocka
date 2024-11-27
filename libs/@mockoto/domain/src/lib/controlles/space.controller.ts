import { authMiddleware } from '@mockoto/authentication';
import { BaseController } from '@mockoto/common';
import { Request, Response } from 'express';
import { ISpace } from '../models';
import { SpaceService } from '../services';

export class SpaceController extends BaseController<ISpace> {
  constructor() {
    super(new SpaceService());
    this.initRoutes();
  }

  override initRoutes() {
    this.router.use(authMiddleware);
    super.initRoutes();
    this.router.get(
      '/summary/getAll',
      [
        authMiddleware,
        // RbacMiddleware.checkPermission('read_space')
      ],
      this.getAllSummary.bind(this)
    );
  }

  protected async getAllSummary(req: Request, res: Response) {
    try {
      const result = await (this.service as SpaceService).getAllSummary(req);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
