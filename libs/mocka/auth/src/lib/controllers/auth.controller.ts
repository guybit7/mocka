import { Router, Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import { authMiddleware } from '../middlewares';

export class AuthController {
  router = Router();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get('/currentUser', authMiddleware, this.currentUser.bind(this));
    this.router.post('/login', this.login.bind(this));
    this.router.post('/logout', this.logout.bind(this));
  }

  public getRouter() {
    return this.router;
  }

  private async currentUser(req: Request, res: Response) {
    console.log(`session: ${JSON.stringify(req.session.user)}`);
    if (req.session.user) {
      res.send({ message: 'Ok', data: req.session.user });
    } else {
      res.status(401).send({ message: 'Current User Failed', data: null });
    }
  }

  private async login(req: Request, res: Response) {
    console.log(`login body ${JSON.stringify(req.body)}`);
    console.log(`pre login`);
    const { email, password } = req.body;

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    req.session.user = user._id;
    console.log(req.session.user);
    console.log(`post login`);
    res.send({ message: 'Ok', data: req.session.user });
  }

  private async logout(req: Request, res: Response) {
    console.log(`logout123`);
    if (req.session.user) {
      req.session.destroy(err => {
        if (err) {
          console.error('Error destroying session:', err);
          return res.status(500).json({ message: 'Error logging out' });
        }
        res.clearCookie('connect.sid');
        res.send({ message: 'Ok', data: null });
      });
    } else {
      res.status(401).json({ message: 'logout failed', data: null });
    }
  }

  hashPassword = async password => {
    return await bcrypt.hash(password, 10);
  };
}
