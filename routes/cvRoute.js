import express from "express";
import { verifyToken } from "../middleware/auth.js";
import multer from "multer";
import {
  generateCVJSON,
  predictSalary,
  recommendCareer,
} from "../controllers/cvController.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

router.post(
  "/generateCVJSON",
  verifyToken,
  upload.fields([{ name: "cv", maxCount: 1 }]),
  generateCVJSON,
);
router.post(
  "/recommendCareer",
  verifyToken,
  upload.fields([{ name: "cv", maxCount: 1 }]),
  recommendCareer,
);
router.post("/predictSalary", verifyToken, predictSalary);

export default router;
