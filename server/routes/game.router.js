import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import { createGame, getGame, getGames, getGamesAtDate, getSeasonGames, updateGamePlayersStatsByExcel } from "../controlers/game.controller";
import authorizeRoles from "../middleware/authorizeRoles";
import upload from "../middleware/upload";

const router = Router();

router.get('/games', authMiddleware, getGames)
router.get('/game/:id', authMiddleware, getGame)
router.get('/gamesAtDate/:date', authMiddleware, getGamesAtDate)
router.get('/seasonGames/:season', authMiddleware, getSeasonGames)

router.post("/game", authMiddleware, authorizeRoles(['admin, superuser']), upload.single('playersStats'), createGame)

router.patch("/game/:id", authMiddleware, authorizeRoles(['admin, superuser']), upload.single('playersStats'), updateGamePlayersStatsByExcel)

export default router;