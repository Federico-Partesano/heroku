import express from "express";
import { salesController } from "../controllers/sales";
import { auth } from "../middleware/out";
const router = express.Router();
const { hello } = salesController;

// router.get("/", auth, hello);
router.get("/", hello);


export default router;
