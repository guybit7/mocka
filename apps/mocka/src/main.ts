/* eslint-disable @typescript-eslint/no-var-requires */
import { AuthController, MockController } from '@mocka/mock';
import express from 'express';

const mongoose = require('mongoose');
const cors = require('cors');

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
app.use(express.json());
app.use(cors());

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

const mockController = new MockController();
const authController = new AuthController();

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.get('/api/auth/me', (req, res) => {
  res.send({ message: 'OKOK', data: { name: 'BITON', id: 1 } });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

app.use('/mock', mockController.getRouter());
app.use('/auth', authController.getRouter());
