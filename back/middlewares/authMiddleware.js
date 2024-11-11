import jwt from 'jsonwebtoken';
import env from 'dotenv';
const protect = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      try {
        const decodedExpired = jwt.decode(token);  // Decode the token to get userId
        if (!decodedExpired) {
          return res.status(401).json({ message: 'Token is expired and invalid' });
        }
      

        // Generate a new access token
        const newAccessToken = jwt.sign(
          { id: decodedExpired.id}, 
          process.env.JWT_SECRET, 
          { expiresIn: '10h' }  // Set the expiration time for the new access token
        );

        res.cookie('token', newAccessToken, { httpOnly: true, secure: true });
        req.user = decodedExpired;
        return next();

      } catch (refreshError) {
        return res.status(401).json({ message: 'Could not refresh token' });
      }
    } else {
      return res.status(401).json({ message: 'Token is not valid' });
    }
  }
};
export default protect;