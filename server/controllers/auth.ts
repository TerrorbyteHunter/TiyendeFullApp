
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    
    // For demo purposes - replace with actual DB query
    const user = {
      id: 1,
      username: 'admin',
      password: await bcrypt.hash('admin123', SALT_ROUNDS),
      email: 'admin@example.com',
      role: 'admin'
    };

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const { password: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    
    // For demo purposes - replace with actual DB insert
    const user = {
      id: 2,
      username,
      password: hashedPassword,
      email,
      role: 'user'
    };

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json({ user: userWithoutPassword, token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const newToken = jwt.sign(
      { id: decoded.id, username: decoded.username, role: decoded.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    res.json({ token: newToken });
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};
