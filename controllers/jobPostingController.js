import * as jobPostingModel from "../models/jobPostingModel.js";

// Create
export const createJobPosting = async (req, res) => {
  const {
    nama_job_posting,
    start_job_posting,
    end_job_posting,
    requirements,
    total_needs,
    salary,
    description,
  } = req.body;

  try {
    const jobPostingId = await jobPostingModel.createJobPosting(
      nama_job_posting,
      start_job_posting,
      end_job_posting,
      requirements,
      total_needs,
      salary,
      description,
    );

    return res.status(201).json({
      message: "Job Posting created successfully",
      id: jobPostingId,
      nama_job_posting,
      start_job_posting,
      end_job_posting,
      requirements,
      total_needs,
      salary,
      description,
    });
  } catch (error) {
    console.error("Error creating job posting:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Read
export const getAllJobPostings = async (req, res) => {
  try {
    const job_postings = await jobPostingModel.getAllJobPostings();

    return res.status(200).json({ job_postings });
  } catch (error) {
    console.error("Error fetching job posting:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Update
export const updateJobPosting = async (req, res) => {
  const { id_job_posting } = req.params;
  const {
    nama_job_posting,
    start_job_posting,
    end_job_posting,
    requirements,
    total_needs,
    salary,
    description,
  } = req.body;

  try {
    const success = await jobPostingModel.updateJobPosting(
      id_job_posting,
      nama_job_posting,
      start_job_posting,
      end_job_posting,
      requirements,
      total_needs,
      salary,
      description,
    );

    if (!success) {
      return res.status(404).json({ error: "job posting not found" });
    }

    return res.status(200).json({
      message: "Job Posting updated successfully",
      id_job_posting,
      nama_job_posting,
      start_job_posting,
      end_job_posting,
      requirements,
      total_needs,
      salary,
      description,
    });
  } catch (error) {
    console.error("Error updating job posting:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Delete
export const deleteJobPosting = async (req, res) => {
  const { id_job_posting } = req.params;

  try {
    const success = await jobPostingModel.deleteJobPosting(id_job_posting);

    if (!success) {
      return res.status(404).json({ error: "Job Posting not found" });
    }

    return res
      .status(200)
      .json({ message: "Job Posting deleted successfully" });
  } catch (error) {
    console.error("Error deleting job posting:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
