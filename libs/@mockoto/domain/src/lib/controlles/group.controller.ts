import { Request, Response } from 'express';
import { GroupService } from '../services/group.service';
import { BaseController } from './base.controller';
import { authMiddleware } from '@mockoto/authentication';

export class GroupController extends BaseController<any> {
  constructor() {
    super(new GroupService());
    this.router.use(authMiddleware);
    this.router.get('/getAll/:spaceId', this.getAllBySpaceId.bind(this));
    super.initRoutes();
  }

  protected async getAllBySpaceId(req: Request, res: Response) {
    try {
      const result = await (this.service as GroupService).getAllBySpaceId(req.params.spaceId);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
