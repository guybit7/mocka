import { Router, Request, Response } from 'express';

export class AuthController {
  router = Router();
  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get('/currentUser', this.currentUser.bind(this));
    this.router.post('/login', this.login.bind(this));
  }

  public getRouter() {
    return this.router;
  }

  private async currentUser(req: Request, res: Response) {
    console.log(`fetch ${req.body}`);
    res.json({ message: 'OKOK', data: { name: 'BITON', id: 1 } });
  }

  private async login(req: Request, res: Response) {
    console.log(`fetch ${req.body}`);
    res.json({ message: 'OKOK', data: 'AAABBBCCC' });
  }
}
