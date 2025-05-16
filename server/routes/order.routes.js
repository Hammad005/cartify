import express from 'express';
import { protectRoute } from '../middleware/authMiddleware.js';
import { cancelOrder, changeStatus, createOrder, getAllOrders, getUserAllOrders } from '../controllers/order.contro.js';
const router = express.Router();

router.post('/createOrder', protectRoute, createOrder);
router.get('/getUserAllOrders', protectRoute, getUserAllOrders);
router.put('/cancelOrder/:id', protectRoute, cancelOrder);
router.get('/getAllOrders', protectRoute, getAllOrders);
router.put('/changeStatus/:id', protectRoute, changeStatus);

export default router;