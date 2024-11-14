import express from 'express';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import {config} from './config/config.js';
import connectDB from './config/db.config.js';
import cookieParser from 'cookie-parser';
import {uploadcloyd }from './config/cloudnary.js';
import {uploads} from './middlewares/multerMiddleware.js';
import cors from 'cors';
import multer from 'multer';
const app = express();

app.use(cors(
  {
    origin: 'http://backend.local',
    credentials: true,

  }
));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes);
app.use('/api/user',userRoutes);

app.use('/api/upload',uploads.single('file'), async (req, res) => {
  try {
    await uploadcloyd(req.file.path, res);
  } catch (err) {
    console.log(err);
  }
});
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