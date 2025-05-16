import express from "express";
import { addToCart, getCart, removeFromCart, incrementQuantity, decrementQuantity } from "../controllers/cart.contro.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();   

router.post("/addToCart", protectRoute, addToCart);
router.get("/getCart", protectRoute, getCart);
router.delete("/removeFromCart/:id", protectRoute, removeFromCart);
router.put("/incrementQuantity/:id", protectRoute, incrementQuantity);
router.put("/decrementQuantity/:id", protectRoute, decrementQuantity);

export default router;