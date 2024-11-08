import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import { config } from '../config/config.js';

// Signup User
export const signup = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = password
    const user = new User({ username, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '10h' });

    res.cookie('token', token, { httpOnly: true });
    res.status(201).json({ message: 'User created successfully', username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = password===user.password;
    console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '10h' });

    // Send token as httpOnly cookie
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'Login successful', usernames:username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Logout User
export const logout = (req, res) => {
  // Clear the token cookie
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
};
