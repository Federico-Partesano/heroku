import express from "express";
import { matchController } from "../controllers/matches";
const router = express.Router();
const { getMatches, removeMatch, joinMatch, addMatch, getMatch, Setmove, addMessage } = matchController;

// router.get("/", auth, hello);
router.get("/", getMatches);
router.get("/:id", getMatch);
router.post("/:id/message", addMessage);
router.post("/:id/join", joinMatch);
router.post("/:id/move", Setmove);
router.delete("/", removeMatch);
router.post("/", addMatch);


export default router;
