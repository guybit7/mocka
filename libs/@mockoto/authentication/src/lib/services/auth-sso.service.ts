import { roleSchema, tenantSchema, userSchema } from '@mockoto/common';
import { development_tenant_1, development_tenant_2, TenantManager } from '@mockoto/core';
import { Request, Response } from 'express';
import axios from 'axios';
import { seedRoles, seedTasks } from '../seeds';
import * as bcrypt from 'bcrypt';

export class AuthSsoService {
  private tenantManager: TenantManager;

  readonly users = ['guybiton1012@gmail.com', 'guybiton7p@gmail.com'];
  MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'; // Ensure this is set

  constructor(tenantManager: TenantManager) {
    this.tenantManager = tenantManager;
  }

  async callback(req: Request, res: Response) {
    const { token, tenantId, account } = req.body;

    try {
      // 1. Validate the Azure token (basic example)
      const azurePublicKeyUrl = `https://login.microsoftonline.com/common/discovery/v2.0/keys`;
      const azureKeys = (await axios.get(azurePublicKeyUrl)).data.keys;
      if (tenantId !== '9188040d-6c67-4c5b-b112-36a304b66dad') {
        return res.status(400).json({
          error: 'The use of this feature is not supported for organizations that have not been assigned yet.',
        });
      }

      if (!this.users.includes(account.username)) {
        return res.status(400).json({ error: 'User not supported' });
      }
      const mail: string = account.username;
      let theTenant = '';
      if (mail === 'guybiton1012@gmail.com') {
        theTenant = development_tenant_1;
      } else if (mail === 'guybiton7p@gmail.com') {
        theTenant = development_tenant_2;
      } else {
        console.error('WIP');
        throw new Error('WIP');
      }
      // 3. Query if the tenant exists (this can be done synchronously)
      const systemTenantModel = await this.tenantManager.getModel('system', 'Tenant', tenantSchema, false);
      const tenantMetadata = await systemTenantModel.findOne({ name: theTenant }).exec();

      if (!tenantMetadata) {
        throw new Error('missing system tenant');
      }

      const userTenantModel = await this.tenantManager.getModel(theTenant, 'User', userSchema, false);
      const userdetails = await userTenantModel.findOne({ email: 'super-admin@gmail.com' }).exec();

      if (!userdetails) {
        console.log('Development Tenant does not Exists');
        await this.seedDevelopmentTenantData(theTenant, userTenantModel);
      }
      console.log('before jwt sign');
      // 4. Send response back to the client immediately
      //   const token = jwt.sign({ userId: account.username }, process.env.SECRET_KEY || 'default_secret', {
      //     expiresIn: '1h',
      //   });

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

  private async seedDevelopmentTenantData(userTenant, userTenantModel) {
    console.log('Seeding tenant data...');
    try {
      const User = userTenantModel.model('User', userSchema);
      const user = await User.findOne();
      if (user === null) {
        await seedTasks(this.tenantManager, userTenant);
        await seedRoles(this.tenantManager, userTenant);
        await this.createDefaultUser(userTenantModel, userTenant);
      } else {
        console.log('Default user salready exists');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async createDefaultUser(userTenantModel, userTenant) {
    try {
      const Role = await this.tenantManager.getModel(userTenant, 'Role', roleSchema, false);
      const adminRole = await Role.findOne({ name: 'super-admin' });
      if (!adminRole) {
        throw new Error('Admin role not found!');
      }
      const User = userTenantModel.model('User', userSchema);
      await User.create({
        email: 'super-admin@gmail.com',
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
