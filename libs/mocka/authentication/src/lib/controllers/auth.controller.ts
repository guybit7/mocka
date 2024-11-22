import { Router, Request, Response } from 'express';
import User from '../models/user';
import * as bcrypt from 'bcrypt';
import { authenticateToken } from '../middlewares';
import { UserService } from '../services';
import { RedisClient } from '@mocka/core';
import * as jwt from 'jsonwebtoken';

export class AuthController {
  router = Router();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post('/login', this.login.bind(this));
    this.router.get('/currentUser', authenticateToken, this.currentUser.bind(this));
    this.router.post('/logout', authenticateToken, this.logout.bind(this));
    this.router.post('/register', this.register.bind(this));
  }

  public getRouter() {
    return this.router;
  }

  private async currentUser(req: Request, res: Response) {
    // console.log(`session: ${JSON.stringify(req.session.user)}`);

    if (req.user) {
      res.send({ message: 'Ok', data: req.user });
    } else {
      res.status(401).send({ message: 'Current User Failed', data: null });
    }
  }

  private async login(req: Request, res: Response) {
    try {
      console.log(bcrypt);
      const { email, password } = req.body;

      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(400).send('Invalid email or password.');

      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        return res.status(400).send('Invalid email or password.');
      }

      if (!user.isVerified) {
        return res.status(400).send('User is not verified');
      }

      // Create JWT token
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.SECRET_KEY,
        { expiresIn: '1h' } // Adjust expiration as needed.
      );

      // when use auth session
      // req.session.user = user._id;
      await RedisClient.set(`user:${user._id}`, JSON.stringify(user), 360000);
      delete user.password;

      res.cookie('token', token, {
        httpOnly: true, // Prevents JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
        sameSite: 'strict', // Prevents cross-site request forgery
        maxAge: 3600000, // Token expiration time (1 hour)
      });

      res.send({ message: 'Ok', data: { user, token } });
    } catch (error) {
      console.log(error);
      res.status(400).send('Error accourd during the login');
    }
  }

  // deprecated
  private async logoutAuthSession(req: Request, res: Response) {
    console.log(`starting logout process`);
    if (req.session.user) {
      const userId = req.session.user._id;
      req.session.destroy(async err => {
        try {
          if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ message: 'Error logging out' });
          }
          const isDeleted = await RedisClient.delete(`user:${userId}`);
          if (isDeleted) {
            console.log('DELETED!!!');
          } else {
            console.log('NOT DELETED!!!');
          }
          res.clearCookie('connect.sid');
          res.send({ message: 'Ok', data: null });
        } catch (e) {
          console.error(`logout failed`, e);
        }
      });
    } else {
      res.status(401).json({ message: 'Not connected user', data: null });
    }
  }
  private async logout(req: Request, res: Response) {
    if (req.user) {
      console.log(`starting logout process`);
      res.clearCookie('token');
      const isDeleted = await RedisClient.delete(`user:${req.user._id}`);
      if (isDeleted) {
        console.log('DELETED!!!');
      } else {
        console.log('NOT DELETED!!!');
      }
      res.send({ message: 'Ok', data: null });
    } else {
      res.status(401).json({ message: 'Not connected user', data: null });
    }
  }

  /*

    {"email":"guy@gmail.com","password":"admin123","fullName":"guy bit","username":"guybit"}
  */
  private async register(req: Request, res: Response) {
    console.log(`register body ${JSON.stringify(req.body)}`);
    console.log(`pre register`);
    try {
      const { email, password, fullName, username } = req.body;

      const user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).send('Email already exsit');
      }
      // validate password
      const crypePassword = await bcrypt.hashSync(password, 10);
      const thePendingUser = await UserService.create({ email, password: crypePassword, fullName, username });

      console.log(`post login`);
      res.send({ message: 'Ok', data: thePendingUser });
    } catch (error) {
      console.log(error);
      res.status(400).send('Error accourd during the login');
    }
  }

  private async postLoginAzure(req: Request, res: Response) {
    console.log(`register body ${JSON.stringify(req.body)}`);
    try {
      res.send({ message: 'Ok', data: 200 });
    } catch (error) {
      console.log(error);
      res.status(400).send('Error accourd during the login');
    }
  }

  hashPassword = async password => {
    return await bcrypt.hash(password, 10);
  };
}
