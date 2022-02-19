import express from "express";
import { chatsController } from "../controllers/chats";
import { usersController } from "../controllers/users";
import { auth } from "../middleware/out";
import { chatSelector } from "../resources/chats";
const router = express.Router();
const { addChat, addMessage, getChats, getChat } = chatsController;

// router.get("/", auth, hello);
router.get("/", getChats);
router.get("/:id", getChat);

router.post("/", addChat);

router.post("/:id/message", addMessage);



export default router;
