import { Router, Request, Response } from 'express';
import { TenantManager } from '@mockoto/core';
import { AuthSsoService } from '../services/auth-sso.service';
import { authMiddleware } from '../middlewares';

export class AuthSsoController {
  private authSsoService = new AuthSsoService(TenantManager.getInstance());

  router = Router();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post('/call-back', this.callback.bind(this));
    this.router.post('/logout', authMiddleware, this.logout.bind(this));
    this.router.get('/currentUser', authMiddleware, this.activeUser.bind(this));
  }

  public getRouter() {
    return this.router;
  }

  private async callback(req: Request, res: Response) {
    await this.authSsoService.callback(req, res);
  }

  private async activeUser(req: Request, res: Response) {
    await this.authSsoService.activeUser(req, res);
  }

  private async logout(req: Request, res: Response) {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    res.status(200).json({ message: 'Logged out successfully' });
  }
}
