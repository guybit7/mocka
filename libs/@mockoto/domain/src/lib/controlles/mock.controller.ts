import { authMiddleware } from '@mockoto/authentication';
import { BaseController } from '@mockoto/common';
import { Request, Response } from 'express';
import { IMock } from '../models';
import { MockService } from '../services';

export class MockController extends BaseController<IMock> {
  constructor() {
    super(new MockService());
    this.initRoutes();
  }

  override initRoutes() {
    this.router.use(authMiddleware);
    super.initRoutes();
    this.router.get(
      '/findQuery',
      [
        // RbacMiddleware.checkPermission('read_space')
      ],
      this.findQuery.bind(this)
    );
  }

  protected async findQuery(req: Request, res: Response) {
    try {
      const result = await (this.service as MockService).findQuery(
        req.body.tenantId,
        req.body.groupId,
        req.body.endpoint
      );
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
