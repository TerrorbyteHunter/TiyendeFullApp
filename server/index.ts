
import express from 'express';
import cors from 'cors';
import { adminRoutes } from './routes/admin';
import { userRoutes } from './routes/user';
import { vendorRoutes } from './routes/vendor';
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

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
