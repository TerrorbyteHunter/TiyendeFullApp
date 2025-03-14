import { Router } from 'express';
import { getBookings, createBooking, getProfile, updateProfile } from '../controllers/user';

const router = Router();

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.get('/bookings', getBookings);
router.post('/bookings', createBooking);

export const userRoutes = router;