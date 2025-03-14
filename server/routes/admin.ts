
import { Router } from 'express';
import { getDashboardStats, getVendors, getRoutes, getTickets } from '../controllers/admin';

const router = Router();

router.get('/dashboard', getDashboardStats);
router.get('/vendors', getVendors);
router.get('/routes', getRoutes);
router.get('/tickets', getTickets);

export const adminRoutes = router;
