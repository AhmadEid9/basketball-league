import { Router } from "express";
import { createClub, getClub, getClubs } from "../controlers/club.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/authorizeRoles.js";

const router = Router();

router.post('/club', authMiddleware ,authorizeRoles(['admin, superuser']), createClub)

router.get('/clubs', authMiddleware, getClubs)
router.get('/:id', authMiddleware, getClub)

router.delete('/:id', authMiddleware, authorizeRoles(['admin, superuser']), createClub)

export default router;