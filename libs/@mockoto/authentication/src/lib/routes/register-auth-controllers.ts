import { Application } from 'express';
import { AuthController } from '../controllers';

export function registerAuthControllers(app: Application) {
  const controllers = [{ path: '/api/auth', controller: new AuthController() }];

  controllers.forEach(({ path, controller }) => {
    app.use(path, controller.getRouter());
  });
}
