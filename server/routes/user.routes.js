import express from "express";
import { checkAuth, createUser, login, logout, updateUserName, updateUserEmail, getAllUsers } from "../controllers/user.contro.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/checkauth', protectRoute, checkAuth);
router.post('/signup', createUser);
router.post('/login', login);
router.post('/logout', protectRoute, logout);
router.put('/updateUserName/:id', protectRoute, updateUserName);
router.put('/updateUserEmail/:id', protectRoute, updateUserEmail);
router.get('/getUsers', protectRoute, getAllUsers)


export default router;