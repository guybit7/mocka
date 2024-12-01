import { BaseService, IRole, IUser, USER, userSchema } from '@mockoto/common';
import { ISystemUser, SystemUserService } from '@mockoto/system';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { RoleService } from './role.service';

export class UserService extends BaseService<IUser> {
  private roleService = new RoleService();
  private systemUserService = new SystemUserService();

  constructor() {
    super(USER, userSchema);
  }

  async create(tenantId: string, userData: IUser): Promise<IUser> {
    let systemUser = null;
    let newUser = null;

    try {
      this.validateUserData(userData);
      const theUserTenant: Model<IUser> = await this.getTenantModel(tenantId);

      const theSystemUser = await this.convertUserToSystemUser(userData, tenantId);

      systemUser = await this.systemUserService.create(tenantId, theSystemUser);

      try {
        newUser = await this.createUserTenantUser(tenantId, theUserTenant, userData, theSystemUser);
      } catch (error) {
        if (systemUser) {
          await this.systemUserService.delete(tenantId, systemUser._id);
        }
        console.error('Error during tenant user creation', error);
        throw new Error('Error during tenant user creation');
      }

      return newUser;
    } catch (error) {
      console.error('Error during user creation process', error);
      throw new Error('Error during user creation process');
    }
  }

  private validateUserData(userData: IUser): void {
    if (!userData.email || !userData.password || !userData.username) {
      throw new Error('Required fields are missing');
    }
  }

  async createUserTenantUser(
    tenantId: string,
    userTenant: Model<IUser>,
    userData: IUser,
    theSystemUser: ISystemUser
  ): Promise<IUser> {
    try {
      const roleModel: Model<IRole> = await this.roleService.getTenantModel(tenantId);
      const adminRole = await roleModel.findOne({ name: 'user' });

      if (!adminRole) {
        throw new Error('Admin role not found!');
      }

      const newUser = await userTenant.create({
        ...userData,
        password: theSystemUser.password,
        createdAt: new Date(),
        role: adminRole._id,
        isVerified: false,
      });

      return newUser;
    } catch (err) {
      console.error('Error during tenant user creation', err);
      throw new Error('Error during tenant user creation');
    }
  }

  async convertUserToSystemUser(user: IUser, tenantId: string): Promise<ISystemUser> {
    const theSystemUser: ISystemUser = {
      email: user.email,
      createdAt: user.createdAt || new Date(),
      fullName: user.fullName,
      isVerified: user.isVerified || false,
      lastLogin: user.lastLogin || new Date(),
      password: await bcrypt.hash(user.password, 10),
      username: user.username,
      updatedAt: user.updatedAt || new Date(),
      tenantId: tenantId,
    };
    return theSystemUser;
  }
}
