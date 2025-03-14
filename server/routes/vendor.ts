import { Router } from 'express';
import { getDashboard, getRoutes, createRoute, updateRoute, getBookings } from '../controllers/vendor';
import { validateRequest } from '../middleware/validate';
import { createRouteSchema, updateRouteSchema } from '@shared/schema'; // Assuming these schemas exist

const router = Router();

router.get('/dashboard', getDashboard);
router.get('/routes', getRoutes);
router.post('/routes', validateRequest(createRouteSchema), createRoute); // Added validation middleware
router.put('/routes/:id', validateRequest(updateRouteSchema), updateRoute); // Added validation middleware
router.get('/bookings', getBookings);

export const vendorRoutes = router;