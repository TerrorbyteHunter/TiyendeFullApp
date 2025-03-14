import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  
  // In a real app, validate against db and hash password
  const user = { id: 1, username, role: 'admin' };
  const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
  
  res.json({ user, token });
};

export const register = async (req: Request, res: Response) => {
  const { username, password, email, role } = req.body;
  
  // In a real app, hash password and save to db
  res.json({ message: 'User registered successfully' });
};

export const refreshToken = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const newToken = jwt.sign(decoded, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token: newToken });
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};