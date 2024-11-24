import { Router, Request, Response } from 'express';
import { development_tenant_1, TenantManager } from '@mockoto/core';
import { AuthSsoService } from '../services/auth-sso.service';

export class AuthSsoController {
  private authSsoService = new AuthSsoService(TenantManager.getInstance());

  router = Router();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post('/call-back', this.callback.bind(this));
    this.router.get('/currentUser', this.activeUser.bind(this));
    // this.router.get('/switcher', this.switcher.bind(this));
  }

  public getRouter() {
    return this.router;
  }

  // private async switcher(req: Request, res: Response) {
  //   await this.authSsoService.getTenantMetadata(development_tenant_1);
  //   await this.authSsoService.getFullUserDetails(development_tenant_1, 'super-admin@gmail.com');
  //   res.send({ message: 'Ok SSO' });
  // }

  private async callback(req: Request, res: Response) {
    await this.authSsoService.callback(req, res);
  }

  private async activeUser(req: Request, res: Response) {
    res.status(500).json({ error: 'Internal Server Error' });
    return;
    res.send({
      message: 'Ok SSO',
      /**
       * Paste one or more documents here
       */
      data: {
        email: 'guybiton7p@gmail.com',
        password: '$2b$10$u/SO8q5G7e163eHW4E36ruGFqmZS9WXkyVrsA3i4RvpekZYiWF85y',
        fullName: 'super-admin',
        username: 'super-admin',
        createdAt: {
          $date: '2024-11-19T14:10:02.992Z',
        },
        role: {
          $oid: '673c9c3a3859687f7642df5f',
        },
        isVerified: true,
        updatedAt: {
          $date: '2024-11-19T14:10:02.994Z',
        },
      },
    });
  }
}
