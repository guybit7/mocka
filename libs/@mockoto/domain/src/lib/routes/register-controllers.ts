import { Application } from 'express';
import { GroupController, MockController, SpaceController } from '../controlles';
import { UserController } from '../controlles/user.controller';

export function registerDomainControllers(app: Application) {
  const controllers = [
    { path: '/api/mock', controller: new MockController() },
    { path: '/api/group', controller: new GroupController() },
    { path: '/api/space', controller: new SpaceController() },
    { path: '/api/user', controller: new UserController() },
  ];

  controllers.forEach(({ path, controller }) => {
    app.use(path, controller.getRouter());
  });
}
