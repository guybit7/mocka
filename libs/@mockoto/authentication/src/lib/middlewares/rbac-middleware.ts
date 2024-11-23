// middlewares/rbacMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import Role from '../models/role';

export class RbacMiddleware {
  static checkPermission(taskId: string) {
    return async (req: any, res: Response, next: NextFunction) => {
      try {
        // Assuming req.user.role contains the user's role name
        console.log('Inside rbac');
        const user = req.user;
        console.log('user: ', user._id);

        const roleFromReq = user.role;
        console.log('role: ', roleFromReq);
        if (!user) {
          return res.status(403).json({ message: 'Access denied' });
        }

        // Retrieve the role and check for the taskId permission
        const role = await Role.findOne({ _id: roleFromReq });
        console.log(role);
        if (role && role.tasks.includes(taskId)) {
          return next();
        }

        return res.status(403).json({ message: 'Permission denied' });
      } catch (error) {
        console.error('RBAC check error:', error);
        return res.status(500).json({ message: 'Server error' });
      }
    };
  }
}
