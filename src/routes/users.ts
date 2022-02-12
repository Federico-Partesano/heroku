import express from "express";
import { usersController } from "../controllers/users";
import { auth } from "../middleware/out";
const router = express.Router();
const { signUp, getUsers, removeUser, login } = usersController;

// router.get("/", auth, hello);
router.get("/", getUsers);

router.post("/login", login);
router.post("/signup", signUp);


router.delete("/", removeUser);


export default router;
