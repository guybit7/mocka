import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';

import cors from 'cors';
import { registerControllers } from '@mocka/mock';
import { dbEventEmitter } from '@mocka/core';
import { mainMiddleware } from '@mocka/mock';
import { initializeSystem } from '@mocka/system';

import dotenv from 'dotenv';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

dotenv.config();

console.log(process.env.CORS_ORIGIN);
const app = express();
app.use(cookieParser());
app.use(express.json());

console.log(process.env.CORS_ORIGIN);
app.use(
  cors({
    origin: [process.env.CORS_ORIGIN, 'http://localhost:4200'], // setting from process.env
    credentials: true,
  })
);

dbEventEmitter.on('dbReady', async () => {
  try {
    // createDefaultTenant();
    await initializeSystem();
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
