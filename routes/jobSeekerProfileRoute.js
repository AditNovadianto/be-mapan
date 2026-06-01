import express from "express";
import { verifyToken } from "../middleware/auth.js";
import multer from "multer";
import {
  createJobSeekerProfile,
  deleteJobSeekerProfile,
  getJobSeekerProfileById,
  updateJobSeekerProfile,
} from "../controllers/jobSeekerProfileCoontroller.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

router.post(
  "/createJobSeekerProfile",
  verifyToken,
  upload.fields([
    { name: "cv", maxCount: 1 },
    { name: "portfolio", maxCount: 1 },
  ]),
  createJobSeekerProfile,
);
router.get(
  "/getJobSeekerProfileById/:id_job_seeker",
  verifyToken,
  getJobSeekerProfileById,
);
router.put(
  "/updateJobSeekerProfile/:id_job_seeker_profile",
  verifyToken,
  upload.fields([
    { name: "cv", maxCount: 1 },
    { name: "portfolio", maxCount: 1 },
  ]),
  updateJobSeekerProfile,
);
router.delete(
  "/deleteJobSeekerProfile/:id_job_seeker_profile",
  verifyToken,
  deleteJobSeekerProfile,
);

export default router;
