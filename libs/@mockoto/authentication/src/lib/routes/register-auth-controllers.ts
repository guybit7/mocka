import { Application } from 'express';
import { AuthController, AuthSsoController } from '../controllers';

export function registerAuthControllers(app: Application) {
  const controllers = [
    { path: '/api/auth', controller: new AuthController() },
    { path: '/api/auth/sso', controller: new AuthSsoController() },
  ];

  controllers.forEach(({ path, controller }) => {
    app.use(path, controller.getRouter());
  });
}
