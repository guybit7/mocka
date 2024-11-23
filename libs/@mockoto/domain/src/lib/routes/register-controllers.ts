import { Application } from 'express';
import { GroupController, MockController, SpaceController } from '../controlles';

export function registerDomainControllers(app: Application) {
  const controllers = [
    { path: '/api/mock', controller: new MockController() },
    { path: '/api/group', controller: new GroupController() },
    { path: '/api/space', controller: new SpaceController() },
  ];

  controllers.forEach(({ path, controller }) => {
    app.use(path, controller.getRouter());
  });
}
