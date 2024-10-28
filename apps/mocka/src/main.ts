import express from 'express';
import session from 'express-session';
import { UserService } from '@mocka/auth';
import cors from 'cors';
import { registerControllers } from '@mocka/mock';
import { MockCron } from '@mocka/cron';
import { dbEventEmitter, store } from '@mocka/core';
import { mainMiddleware } from '@mocka/mock';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(express.json());

app.use(
  session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: false,
    store: store,
    // cookie: { secure: true, httpOnly: true, maxAge: 3600000 },
  })
);

app.use(
  cors({
    origin: ['http://localhost:4200'], // setting from process.env
    credentials: true,
  })
);

dbEventEmitter.on('dbReady', async () => {
  try {
    const user = await UserService.findOne();
    if (!user) {
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
registerControllers(app);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
  const mock = new MockCron();
});
