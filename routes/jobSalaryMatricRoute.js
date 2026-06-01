import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  createJobSalaryMatric,
  deleteJobSalaryMatric,
  getJobSalaryMatricByJobPostingId,
  updateJobSalaryMatric,
} from "../controllers/jobSalaryMatricController.js";

const router = express.Router();

router.post("/createJobSalaryMatric", verifyToken, createJobSalaryMatric);
router.get(
  "/getJobSalaryMatricByJobPostingId/:id_job_posting",
  verifyToken,
  getJobSalaryMatricByJobPostingId,
);
router.put(
  "/updateJobSalaryMatric/:id_job_salary_matric",
  verifyToken,
  updateJobSalaryMatric,
);
router.delete(
  "/deleteJobSalaryMatric/:id_job_salary_matric",
  verifyToken,
  deleteJobSalaryMatric,
);

export default router;
