import { Router } from 'express';
import { validateRequest } from '../middleware/validate';
import { getProfile, updateProfile, getBookings, createBooking } from '../controllers/user';
import { z } from 'zod';

//Simplified schema for demonstration - replace with your actual schemas
const profileSchema = z.object({
  name: z.string(),
  email: z.string().email()
});

const router = Router();

router.get('/profile', getProfile);
router.put('/profile', validateRequest(profileSchema), updateProfile);
router.get('/bookings', getBookings);
router.post('/bookings', validateRequest(z.object({date: z.string(), time: z.string(), details: z.string().optional()})), createBooking);

export default router;