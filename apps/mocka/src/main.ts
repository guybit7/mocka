/* eslint-disable @typescript-eslint/no-var-requires */
import { MockController, AuthController } from '@mocka/mock';
import express from 'express';
import session from 'express-session';

const mongoose = require('mongoose');
const cors = require('cors');

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:4200'], // setting from process.env
    credentials: true,
  })
);

app.use(
  session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: false,
  })
);

const mockController = new MockController();
const authController = new AuthController();

app.use('/mock', mockController.getRouter());
app.use('/auth', authController.getRouter());

// app.use((req, res, next) => {
//   console.log('*******');
//   console.log(req.session.user);
//   console.log('*******');
//   next();
// });

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mocka', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', () => {
  console.error('MongoDB connection error:');
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
