import { Router, Request, Response } from 'express';


export class AuthController {
  // router = Router();

  // theUser = { name: 'GUY_BITON', id: 1 };
  // constructor() {
  //   this.initRoutes();
  // }

  // private initRoutes() {
  //   this.router.get('/currentUser', this.currentUser.bind(this));
  //   this.router.post('/login', this.login.bind(this));
  //   this.router.post('/logout', this.logout.bind(this));
  // }

  // public getRouter() {
  //   return this.router;
  // }

  // private async currentUser(req: Request, res: Response) {
  //   console.log(`fetch currentUser -> ${JSON.stringify(req.body)}`);
  //   console.log(`session: ${JSON.stringify(req.session.user)}`);
  //   if (req.session.user) {
  //     res.send({ message: 'Ok', data: req.session.user });
  //   } else {
  //     res.status(401).send({ message: 'Current User Failed', data: null });
  //   }
  // }

  // private async login(req: Request, res: Response) {
  //   console.log(`login body ${JSON.stringify(req.body)}`);
  //   const { email, password } = req.body;
  //   if (email === 'super-admin') {
  //     req.session.user = this.theUser;

  //     // await redis.set('cachedData', JSON.stringify(dataToCache), 'EX', 60); // Cache for 1 hour
  //     res.send({ message: 'Ok', data: req.session.user });
  //   } else {
  //     res.status(401);
  //   }
  // }

  // private async logout(req: Request, res: Response) {
  //   console.log(`logout123`);
  //   if (req.session.user) {
  //     req.session.destroy(err => {
  //       if (err) {
  //         console.error('Error destroying session:', err);
  //         return res.status(500).json({ message: 'Error logging out' });
  //       }
  //       res.clearCookie('connect.sid');
  //       res.send({ message: 'Ok', data: null });
  //     });
  //   } else {
  //     res.status(401).json({ message: 'logout failed', data: null });
  //   }
  // }
}
