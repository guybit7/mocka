import { roleSchema, tenantSchema, userSchema } from '@mockoto/common';
import { development_tenant_1, development_tenant_2, TenantManager } from '@mockoto/core';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';
import { TenantsService } from '@mockoto/system';
import { seedRoles, seedTasks } from '../seeds';
import * as bcrypt from 'bcrypt';

export class AuthSsoService {
  private tenantManager: TenantManager;

  readonly JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'default_secret';
  private tenantsService: TenantsService = null;
  constructor(tenantManager: TenantManager) {
    this.tenantManager = tenantManager;
    this.tenantsService = new TenantsService(this.tenantManager);
  }

  async callback(req: Request, res: Response) {
    const { token, tenantId, account, uniqueId } = req.body;
    // console.log(req.body);
    try {
      // 1. Validate the Azure token (basic example)
      const azurePublicKeyUrl = `https://login.microsoftonline.com/common/discovery/v2.0/keys`;
      const azureKeys = (await axios.get(azurePublicKeyUrl)).data.keys;
      if (tenantId !== '9188040d-6c67-4c5b-b112-36a304b66dad') {
        return res.status(400).json({
          error: 'The use of this feature is not supported for organizations that have not been assigned yet.',
        });
      }

      const username: string = account.username;
      let theTenant = '';
      if (username === 'guybiton1012@gmail.com') {
        theTenant = development_tenant_1;
      } else if (username === 'guybiton7p@gmail.com') {
        theTenant = development_tenant_2;
      } else {
        const tenantPrefix = username.split('@')[0];
        const tenantSuffix = uniqueId.split('-').pop();
        theTenant = `${tenantPrefix}-${tenantSuffix}`;
      }

      const theTenatnDetails = await this.tenantsService.getTenantByName(theTenant);

      if (!theTenatnDetails) {
        await this.tenantsService.createTenant({
          name: theTenant,
          tenantSchema: 'default',
          ownerEmail: username,
          createdAt: new Date(),
          updatedAt: new Date(),
          status: 'active',
        });
      }

      const userTenantModel = await this.tenantManager.getModel(theTenant, 'User', userSchema, false);
      const userdetails = await userTenantModel.findOne({ email: username }).exec();
      console.log(userdetails);
      if (!userdetails) {
        console.log('Development Tenant does not Exists');
        await this.seedDevelopmentTenantData(theTenant, userTenantModel, username);
      }
      console.log('before jwt sign');

      // 4. Send response back to the client immediately
      const token = jwt.sign(
        {
          userId: account.username,
          tenantId: theTenant,
        },
        this.JWT_SECRET_KEY,
        {
          expiresIn: '1h',
        }
      );

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600000,
      });

      res.send({ message: 'Ok SSO', data: { token } });
    } catch (error) {
      console.error('Error handling callback:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async activeUser(req: Request, res: Response) {
    const token = req.cookies.token; // Retrieve the token from cookies

    if (!token) {
      return res.status(401).json({ message: 'Access token is missing or invalid' });
    }

    try {
      const decoded = jwt.verify(token, this.JWT_SECRET_KEY);

      const { userId, tenantId } = decoded;

      console.log('userId: ' + userId);
      console.log('tenantId: ' + tenantId);

      const t = await this.tenantManager.getModel(tenantId, 'User', userSchema, false);
      const theActiveUser = await t.findOne({ email: userId });
      console.log(theActiveUser);
      // req.user = decoded; // Add user info to request object
      res.send({ message: 'Ok SSO', data: theActiveUser });
    } catch (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
  }

  private async seedDevelopmentTenantData(userTenant, userTenantModel, username) {
    console.log('Seeding tenant data...');
    try {
      const User = userTenantModel.model('User', userSchema);
      const user = await User.findOne();
      if (user === null) {
        await seedTasks(this.tenantManager, userTenant);
        await seedRoles(this.tenantManager, userTenant);
        await this.createDefaultUser(userTenantModel, userTenant, username);
      } else {
        console.log('Default user salready exists');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async createDefaultUser(userTenantModel, userTenant, username) {
    try {
      const Role = await this.tenantManager.getModel(userTenant, 'Role', roleSchema, false);
      const adminRole = await Role.findOne({ name: 'super-admin' });
      if (!adminRole) {
        throw new Error('Admin role not found!');
      }
      const User = userTenantModel.model('User', userSchema);
      await User.create({
        email: username,
        password: await bcrypt.hash('admin123', 10),
        fullName: 'super-admin',
        username: 'super-admin',
        createdAt: new Date(),
        role: adminRole._id,
        isVerified: true,
      });
    } catch (err) {
      console.log(err);
    }
  }

  // Fetch tenant metadata from the system database
  async getTenantMetadata(name: string) {
    const systemTenantModel = await this.tenantManager.getModel('system', 'Tenant', tenantSchema, false);
    const tenantMetadata = await systemTenantModel.findOne({ name }).exec();
    console.log(tenantMetadata);
    if (!tenantMetadata) {
      throw new Error(`Tenant with ID ${name} not found`);
    }

    return tenantMetadata;
  }

  async getFullUserDetails(tenantName, email: string) {
    const activeTenantModel = await this.tenantManager.getModel(tenantName, 'User', userSchema, false);
    const userdetails = await activeTenantModel.findOne({ email }).exec();
    console.log(userdetails);
    if (!userdetails) {
      throw new Error(`User ${email} not found`);
    }
    // await this.tenantManager.closeAllConnections();
    return userdetails;
  }
}
