import { authMiddleware } from '@mockoto/authentication';
import { BaseController } from '@mockoto/common';
import { Request, Response } from 'express';
import { IGroup } from '../models';
import { GroupService } from '../services/group.service';

export class GroupController extends BaseController<IGroup> {
  constructor() {
    super(new GroupService());
    this.initRoutes();
  }

  override initRoutes() {
    this.router.use(authMiddleware);
    super.initRoutes();
    this.router.get('/getAll/:spaceId', this.getAllBySpaceId.bind(this));
  }

  protected async getAllBySpaceId(req: Request, res: Response) {
    try {
      const result = await (this.service as GroupService).getAllBySpaceId(req.tenantId, req.params.spaceId);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
