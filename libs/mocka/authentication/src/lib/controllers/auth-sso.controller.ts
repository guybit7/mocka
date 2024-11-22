import { Router, Request, Response } from 'express';
import axios from 'axios';
import { development_tenant, RedisClient } from '@mocka/core';
import * as jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { SystemService, TenantsService } from '@mocka/system';
import { seedRoles, seedTasks } from '../seeds';
import { UserService } from '../services';

const MONGODB_URI = process.env.MONGO_URI; // mongodb://mocka-mongo:27017/mocka

export class AuthSsoController {
  private systemService = new SystemService();
  private tenantsService = new TenantsService(this.systemService);

  router = Router();
  readonly users = ['guybiton1012@gmail.com', 'guybiton7p@gmail.com'];

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post('/call-back', this.callback.bind(this));
    this.router.get('/currentUser', this.activeUser.bind(this));
  }

  public getRouter() {
    return this.router;
  }

  private async callback(req: Request, res: Response) {
    const { token, tenantId, account } = req.body;

    try {
      // 1. Validate the Azure token (basic example)
      const azurePublicKeyUrl = `https://login.microsoftonline.com/common/discovery/v2.0/keys`;
      const azureKeys = (await axios.get(azurePublicKeyUrl)).data.keys;
      // console.log(azureKeys);
      // (Use a library like jsonwebtoken or jose to validate the token with these keys.)
      if (tenantId !== '9188040d-6c67-4c5b-b112-36a304b66dad') {
        return res.status(400).json({
          error: 'The use of this feature is not supported for organizations that have not been assigned yet.',
        });
      }

      console.log('individual user logedin: ', account.username);
      if (!this.users.includes(account.username)) {
        console.log('no supported for this users yet');
        return res.status(400).json({ error: 'no supported for this users yet' });
      }

      console.log('userloged in: ', account.username);

      try {
        // Step 1: Connect to the system service (database)
        await this.systemService.connect();

        // Step 2: Check if the tenant exists by querying the tenant service
        const developmentTenantExists = await this.tenantsService.getTenantByName(development_tenant); // Ensure you await this function
        if (!developmentTenantExists) {
          console.log('Development tenant not found');
          return res.status(404).json({ error: 'Development tenant not found' });
        }

        // Step 3: Only disconnect after all operations are complete
        await this.systemService.disconnect();
      } catch (e) {
        console.log(e);
        return res.status(400).json({ error: e.message || e });
      }

      // Step 4: Create a connection to the tenant-specific database
      const tenantDb = await mongoose.createConnection(
        `${MONGODB_URI}${development_tenant}` // Use the tenant's database name
      );

      tenantDb.on('connected', async () => {
        console.log('Connected to tenant database.');

        try {
          // Step 5: Perform database seeding tasks after establishing tenant database connection
          await seedTasks();
          await seedRoles();
          console.log('Tenant data seeded successfullyy');

          // 2. Verify or create tenant and user
          // const tenant = await TenantModel.findOne({ tenantId });
          // if (!tenant) {
          //   // Create a new tenant if it doesn't exist (if allowed)
          //   return res.status(400).json({ error: 'Tenant not found' });
          // }
          // Create JWT token
          const token = jwt.sign(
            {
              userId: account.username,
              // role: user.role,
              // tenantId,
              // email: user.email,
              // name: user.name,
            },
            process.env.SECRET_KEY,
            { expiresIn: '1h' } // Adjust expiration as needed.
          );

          // when use auth session
          // req.session.user = user._id;
          // await RedisClient.set(`user:${user._id}`, JSON.stringify(user), 360000);
          // delete user.password;

          res.cookie('token', token, {
            httpOnly: true, // Prevents JavaScript from accessing the cookie
            secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
            sameSite: 'strict', // Prevents cross-site request forgery
            maxAge: 3600000, // Token expiration time (1 hour)
          });

          res.send({ message: 'Ok SSO', data: { token } });
        } catch (e) {
          console.log('Error seeding tenant data:', e);
          return res.status(500).json({ error: e.message || 'Error seeding tenant data' });
        } finally {
          // Step 6: Close the tenant database connection after seeding
          await tenantDb.close();
        }
      });
    } catch (error) {
      console.error('Error handling SSO callback:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
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
