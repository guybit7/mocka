import mongoose from 'mongoose';
import EventEmitter from 'events';
//
const MONGODB_URI = process.env.MONGO_URI; // mongodb://mocka-mongo:27017/mocka

export const dbEventEmitter = new EventEmitter();

//////////////////////////////////////////////////// Connect to MongoDB
mongoose
  .connect(`${MONGODB_URI}`, {})
  .then(res => {
    console.log('connecting to mongodb mocka database');
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
  dbEventEmitter.emit('dbReady');
});
