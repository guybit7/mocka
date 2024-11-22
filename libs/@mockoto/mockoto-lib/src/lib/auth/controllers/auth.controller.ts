import { Router, Request, Response } from 'express';

export class AuthController {
  router = Router();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get('/test', this.login.bind(this));
    this.router.get('/test2', this.login.bind(this));
  }

  public getRouter() {
    return this.router;
  }

  private async login(req: Request, res: Response) {
    res.send({ message: 'Ok', data: 'tes123t' });
  }
}
