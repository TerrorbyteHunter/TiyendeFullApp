
import express from 'express';
import cors from 'cors';
import { apiLimiter, authLimiter } from './middleware/rate-limit';
import { adminRoutes } from './routes/admin';
import { userRoutes } from './routes/user';
import { vendorRoutes } from './routes/vendor';
import { authRoutes } from './routes/auth';
import { authMiddleware } from './middleware/auth';

const app = express();
import { env } from './config/env';

app.use(cors());
app.use(express.json());

// Auth routes (public) with strict rate limiting
app.use('/api/auth', authLimiter, authRoutes);

// Protected routes with general API rate limiting
app.use('/api/admin', apiLimiter, authMiddleware, adminRoutes);
app.use('/api/user', authMiddleware, userRoutes);
app.use('/api/vendor', authMiddleware, vendorRoutes);

// Global error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(parseInt(env.PORT), '0.0.0.0', () => {
  console.log(`Server running on port ${env.PORT} in ${env.NODE_ENV} mode`);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
