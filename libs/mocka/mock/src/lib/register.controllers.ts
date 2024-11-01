import { Application } from 'express';
import { GroupController, MockController, SpaceController } from './controlles';
import { AuthController } from '@mocka/authentication';

export function registerControllers(app: Application) {
  const controllers = [
    { path: '/api/mock', controller: new MockController() },
    { path: '/api/auth', controller: new AuthController() },
    { path: '/api/group', controller: new GroupController() },
    { path: '/api/space', controller: new SpaceController() },
  ];

  controllers.forEach(({ path, controller }) => {
    app.use(path, controller.getRouter());
  });
}
