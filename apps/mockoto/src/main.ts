import cookieParser from 'cookie-parser';
import express, { Request, Response } from 'express';

import cors from 'cors';
// import { dbEventEmitter } from '@mockoto/core';
import { initializeSystem } from '@mockoto/system';

import { registerAuthControllers } from '@mockoto/authentication';
import { mainMiddleware, registerDomainControllers } from '@mockoto/domain';
import dotenv from 'dotenv';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

dotenv.config();
console.log(process.env.CORS_ORIGIN);
console.log(process.env.JWT_SECRET_KEY);
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

app.use(mainMiddleware);
registerAuthControllers(app);
registerDomainControllers(app);

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

const server = app.listen(port, '0.0.0.0', async () => {
  console.log(`[ ready ] http://${host}:${port}`);
  // const mock = new MockCron();
  await initializeSystem();
  console.log('Current server time:', new Date().toString());
});
