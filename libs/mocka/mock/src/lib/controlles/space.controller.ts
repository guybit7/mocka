import { Router } from 'express';
import { SpaceService } from '../services';
import { BaseController } from './base.controller';
export class SpaceController extends BaseController<any> {
  router = Router();
  SpaceService = new SpaceService();
  constructor() {
    super(new SpaceService());
  }
}
