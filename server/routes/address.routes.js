import express from 'express';
import { protectRoute } from '../middleware/authMiddleware.js';
import { createAddress, getAddress, deleteAddress } from '../controllers/address.contro.js';

const router = express.Router();

router.post('/createAddress',protectRoute,  createAddress);
router.get('/getAddress',protectRoute,  getAddress);
router.delete('/deleteAddress/:id',protectRoute,  deleteAddress);

export default router;