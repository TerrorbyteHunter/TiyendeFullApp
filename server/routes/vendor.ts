import { Router } from 'express';
import { getDashboard, getRoutes, createRoute, updateRoute, getBookings } from '../controllers/vendor';

const router = Router();

router.get('/dashboard', getDashboard);
router.get('/routes', getRoutes);
router.post('/routes', createRoute);
router.put('/routes/:id', updateRoute);
router.get('/bookings', getBookings);

export const vendorRoutes = router;