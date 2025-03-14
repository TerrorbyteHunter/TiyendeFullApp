import { Router } from 'express';
import { login, register, refreshToken } from '../controllers/auth';
import { validateRequest } from '../middleware/validate';
import { loginSchema } from '@shared/schema';
import * as z from 'zod'; // Assuming zod is used

const router = Router();

router.post('/login', validateRequest(loginSchema), login);
router.post('/register', register); //No validation schema provided for register.
router.post('/refresh-token', validateRequest(z.object({ token: z.string() })), refreshToken);

export const authRoutes = router;