import { Router } from "express";
import { createClub } from "../controlers/club.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/authorizeRoles.js";

const router = Router();

router.post('/login', authMiddleware ,authorizeRoles(['admin, superuser']), createClub)

export default router;