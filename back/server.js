import express from 'express';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import {config} from './config/config.js';
import connectDB from './config/db.config.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors(
  {
    origin: process.env.CORS,
    credentials: true
  }
));
app.use('/api/auth', authRoutes);
app.use('/api/user',userRoutes);

const startServer = async () => {
    try {
      await connectDB(); 
      app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
      });
    } catch (err) {
      console.error('Error while starting the server:', err);
      process.exit(1); 
    }
  };
  startServer();
