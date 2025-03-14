
import { Router } from 'express';
import { loginSchema } from '@shared/schema';
import { validateRequest } from '../middleware/validate';
import { login, refreshToken } from '../controllers/auth';

const router = Router();

router.post('/login', validateRequest(loginSchema), login);
router.post('/refresh-token', refreshToken);

export default router;
