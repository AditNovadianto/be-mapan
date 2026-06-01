import express from "express";
import {
  createJobPosting,
  deleteJobPosting,
  getAllJobPostings,
  updateJobPosting,
} from "../controllers/jobPostingController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/createJobPosting", verifyToken, createJobPosting);
router.get("/getAllJobPostings", verifyToken, getAllJobPostings);
router.put("/updateJobPosting/:id_job_posting", verifyToken, updateJobPosting);
router.delete(
  "/deleteJobPosting/:id_job_posting",
  verifyToken,
  deleteJobPosting,
);

export default router;
