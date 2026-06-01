import express from "express";
import {
  getAllEmployeers,
  signIn,
  signUp,
} from "../controllers/employeerController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/signUpEmployeer", signUp);
router.post("/signInEmployeer", signIn);
router.get("/getAllEmployeers", verifyToken, getAllEmployeers);

export default router;
