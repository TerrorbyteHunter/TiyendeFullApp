
import express from 'express';
import cors from 'cors';
import { adminRoutes } from './routes/admin';
import { userRoutes } from './routes/user';
import { vendorRoutes } from './routes/vendor';
import { authRoutes } from './routes/auth';
import { authMiddleware } from './middleware/auth';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Auth routes (public)
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/admin', authMiddleware, adminRoutes);
app.use('/api/user', authMiddleware, userRoutes);
app.use('/api/vendor', authMiddleware, vendorRoutes);

// Global error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
