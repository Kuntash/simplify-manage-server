import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load configuration variable before importing app
dotenv.config({
  path: `${__dirname}/config.env`,
});

// Connect mongoose to mongoDB atlas
const connectMongoDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@management-system.7unpu.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`
    );
    console.log('Database successfully connected');
  } catch (err) {
    console.log(err);
  }
};

connectMongoDB();

import app from './app';
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server hosted at localhost:${port}`);
});
