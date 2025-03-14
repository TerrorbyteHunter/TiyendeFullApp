import { Router } from 'express';
import { getBookings, createBooking, getProfile, updateProfile } from '../controllers/user';
import { z } from 'zod';


//Simplified schema for demonstration - replace with your actual schemas
const bookingSchema = z.object({
  date: z.string(),
  time: z.string(),
  details: z.string().optional()
});

const profileSchema = z.object({
  name: z.string(),
  email: z.string().email()
});

const validateRequest = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    console.error("Validation error:", error);
    res.status(400).json({ error: 'Invalid request data' });
  }
};


const router = Router();

router.get('/profile', getProfile);
router.put('/profile', validateRequest(profileSchema), updateProfile);
router.get('/bookings', getBookings);
router.post('/bookings', validateRequest(bookingSchema), createBooking);

export const userRoutes = router;