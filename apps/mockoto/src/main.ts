import express from 'express';
import session from 'express-session';
import { dbEventEmitter, store } from '@mockoto/core';
import { registerDomainControllers } from '@mockoto/domain';
import { mainMiddleware } from '@mockoto/domain';

import cors from 'cors';
import { registerAuthControllers, seedRoles, seedTasks, UserService } from '@mockoto/authentication';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
app.use(express.json());

const currentDate = new Date();

const theExpiresDate = new Date(currentDate.getTime() + 4 * 60 * 60 * 1000);
app.use(
  session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      secure: false,
      httpOnly: true,
      expires: theExpiresDate,
    },
  })
);

app.use(
  cors({
    origin: [process.env.CORS_ORIGIN, 'http://localhost:4200'], // setting from process.env
    credentials: true,
  })
);

dbEventEmitter.on('dbReady', async () => {
  try {
    console.log('DB IS READY!');
    const user = await UserService.findOne();
    if (!user) {
      await seedTasks();
      await seedRoles();
      await UserService.createDefaultUser();
      console.log('Default user created');
    } else {
      console.log('Default user already exists');
    }
  } catch (err) {
    console.error('Error checking/creating default user:', err);
  }
});

app.use(mainMiddleware);
registerAuthControllers(app);
registerDomainControllers(app);
app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`[ ready ] http://${host}:${port}`);
  // const mock = new MockCron();
  console.log('Current server time:', new Date().toString());
});
