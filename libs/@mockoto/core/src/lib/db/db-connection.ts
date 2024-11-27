import mongoose from 'mongoose';

const mongoOptions = {
  //   useUnifiedTopology: true,
  //   autoIndex: true,
  //   connectTimeoutMS: 10000,
  //   socketTimeoutMS: 30000,
};

export const connect = async (url: string) => {
  return mongoose.createConnection(url, { ...mongoOptions }).asPromise();
};
