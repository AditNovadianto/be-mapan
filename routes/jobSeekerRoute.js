import express from "express";
import {
  getAllJobSeekers,
  signIn,
  signUp,
} from "../controllers/jobSeekerController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/signUpJobSeeker", signUp);
router.post("/signInJobSeeker", signIn);
router.get("/getAllJobSeekers", verifyToken, getAllJobSeekers);

export default router;
