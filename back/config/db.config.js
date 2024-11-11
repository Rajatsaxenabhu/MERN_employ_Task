import mongoose from 'mongoose';
import {config} from './config.js';

const connectDB = async () => {
  try {
    console.log(config.mongoURI);
    await mongoose.connect(config.mongoURI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

export default connectDB;
