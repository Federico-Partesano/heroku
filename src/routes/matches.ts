import express from "express";
import { matchController } from "../controllers/matches";
const router = express.Router();
const { getMatches, removeMatch, addMatch, getMatch, Setmove } = matchController;

// router.get("/", auth, hello);
router.get("/", getMatches);
router.get("/:id", getMatch);
router.get("/:id/moves", Setmove);
router.delete("/", removeMatch);
router.post("/", addMatch);


export default router;
