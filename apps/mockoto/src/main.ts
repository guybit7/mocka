/* eslint-disable @nx/enforce-module-boundaries */
import express from 'express';
import { AuthController } from '@mockoto/mockoto-lib';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

const controllers = [{ path: '/api/auth', controller: new AuthController() }];

controllers.forEach(({ path, controller }) => {
  app.use(path, controller.getRouter());
});

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
