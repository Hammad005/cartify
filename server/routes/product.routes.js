import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/product.contro.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/getAllProducts", getAllProducts);
router.post("/createProduct", protectRoute, createProduct);
router.put("/updateProduct/:id", protectRoute, updateProduct);
router.delete("/deleteProduct/:id", protectRoute, deleteProduct);

export default router;
