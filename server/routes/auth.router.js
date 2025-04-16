import { Router } from "express";
import { deleteSelf, deleteUser, login, signup } from "../controlers/auth.controler.js";
import authMiddleware from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/authorizeRoles.js";

const router = Router();


router.post('/signup', signup);

router.post('/login', login);

router.delete('/user/:id', authMiddleware, authorizeRoles('admin', 'superuser'), deleteUser);
router.delete('/self', authMiddleware, deleteSelf);


export default router;