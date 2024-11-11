import dotenv from 'dotenv';

dotenv.config();
export const config = {
  mongoURI: `mongodb://${process.env.MONGO_HOST}:27017/myapp`,
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.SERVER_PORT || 5000,
};
