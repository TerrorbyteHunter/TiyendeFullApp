
import { Router } from 'express';
import { insertVendorSchema } from '@shared/schema';
import { validateRequest } from '../middleware/validate';
import { createVendor, getVendors, updateVendor, deleteVendor } from '../controllers/vendor';

const router = Router();

router.get('/', getVendors);
router.post('/', validateRequest(insertVendorSchema), createVendor);
router.put('/:id', validateRequest(insertVendorSchema), updateVendor);
router.delete('/:id', deleteVendor);

export default router;
