import express, { Request, Response } from 'express';
import session from 'express-session';
import { UserService } from '@mocka/authentication';
import cors from 'cors';
import { registerControllers } from '@mocka/mock';
// import { MockCron } from '@mocka/cron';
import { dbEventEmitter, store } from '@mocka/core';
import { mainMiddleware } from '@mocka/mock';
import { seedTasks, seedRoles } from '@mocka/authentication';
import dotenv from 'dotenv';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

dotenv.config();

console.log(process.env.CORS_ORIGIN);
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
      expires: theExpiresDate, // Set expiration explicitly
    },
  })
);

console.log(process.env.CORS_ORIGIN);
app.use(
  cors({
    origin: [process.env.CORS_ORIGIN], // setting from process.env
    credentials: true,
  })
);

dbEventEmitter.on('dbReady', async () => {
  try {
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
registerControllers(app);

app.get('/api/test/add', async (req: Request, res: Response) => {
  try {
    // Replace this with your actual logic to fetch data
    req.session.user = 'GUY_ID'; // Replace with actual user ID
    res.json({ status: 'success', message: 'User logged in', session: req.session });
  } catch (error) {
    console.log(error);
  }
});

app.get('/api/test', async (req: Request, res: Response) => {
  try {
    // Replace this with your actual logic to fetch data
    console.log('>>>>>>>>');
    console.log(req.session);
    res.json({ status: 'success', message: 'server is running', session: req.session });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`[ ready ] http://${host}:${port}`);
  // const mock = new MockCron();
  console.log('Current server time:', new Date().toString());
});
