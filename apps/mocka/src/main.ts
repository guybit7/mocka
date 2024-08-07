/* eslint-disable @typescript-eslint/no-var-requires */
import { MockController } from '@mocka/mock';
import { AuthController } from '@mocka/auth';
import express from 'express';
import session from 'express-session';
import { UserService } from '@mocka/auth';

import { default as connectMongoDBSession } from 'connect-mongodb-session';

const MONGODB_URI = 'mongodb://localhost:27017/mocka';
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const MongoDBStore = connectMongoDBSession(session);

//////////////////////////////////////////////////// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(res => {
    console.log('connecting to mongodb mocka database');

    UserService.findOne().then(user => {
      if (!user) {
        UserService.createDefaultUser();
      }
    });

    app.listen(port, host, () => {
      console.log(`[ ready ] http://${host}:${port}`);
    });
  })
  .catch(err => {
    console.log(err);
  });

const db = mongoose.connection;
db.on('error', () => {
  console.error('MongoDB connection error:');
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});
//////////////////////////////////////////////////// MongoDBSession
var store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions',
});
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
    store: store,
    // cookie: { secure: true, httpOnly: true, maxAge: 3600000 },
  })
);
//////////////////////////////////////////////////

const mockController = new MockController();
const authController = new AuthController();

app.use('/mock', mockController.getRouter());
app.use('/auth', authController.getRouter());
