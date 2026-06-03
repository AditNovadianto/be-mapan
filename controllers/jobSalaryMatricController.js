import * as jobSalaryMatricModel from "../models/jobSalaryMatricModel.js";

// Create
export const createJobSalaryMatric = async (req, res) => {
  const { job_title, location, mean_salary, company_name, id_job_posting } =
    req.body;

  try {
    const jobSalaryMatricId = await jobSalaryMatricModel.createJobSalaryMatric(
      job_title,
      location,
      mean_salary,
      company_name,
      id_job_posting,
    );

    return res.status(201).json({
      message: "Job Salary Matric created successfully",
      id: jobSalaryMatricId,
      job_title,
      location,
      mean_salary,
      company_name,
      id_job_posting,
    });
  } catch (error) {
    console.error("Error creating job salary matric:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Read
export const getJobSalaryMatricByJobPostingId = async (req, res) => {
  const { id_job_posting } = req.params;

  try {
    const jobSalaryMatric =
      await jobSalaryMatricModel.getJobSalaryMatricByJobPostingId(
        id_job_posting,
      );

    return res.status(200).json({ job_salary_matric: jobSalaryMatric });
  } catch (error) {
    console.error("Error fetching job salary matric:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Update
export const updateJobSalaryMatric = async (req, res) => {
  const { id_job_salary_matric } = req.params;
  const { job_title, location, mean_salary, company_name } = req.body;

  try {
    const success = await jobSalaryMatricModel.updateJobSalaryMatric(
      id_job_salary_matric,
      job_title,
      location,
      mean_salary,
      company_name,
    );

    if (!success) {
      return res.status(404).json({ error: "Job Salary Matric not found" });
    }

    return res.status(200).json({
      message: "Job Salary Matric updated successfully",
      id: id_job_salary_matric,
      job_title,
      location,
      mean_salary,
      company_name,
    });
  } catch (error) {
    console.error("Error updating job salary matric:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Delete
export const deleteJobSalaryMatric = async (req, res) => {
  const { id_job_salary_matric } = req.params;

  try {
    const success =
      await jobSalaryMatricModel.deleteJobSalaryMatric(id_job_salary_matric);

    if (!success) {
      return res.status(404).json({ error: "Job Salary Matric not found" });
    }

    return res
      .status(200)
      .json({ message: "Job Salary Matric deleted successfully" });
  } catch (error) {
    console.error("Error deleting job salary matric:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


// Tambahkan ini di dalam file controller Anda
export const searchJobSalaryMatric = async (req, res) => {
  const { job_title, location } = req.query;

  try {
    const data = await jobSalaryMatricModel.searchJobSalaryMatric(
      job_title,
      location
    );

    return res.status(200).json({
      message: "Data retrieved successfully",
      total_data: data.length,
      data: data,
    });
  } catch (error) {
    console.error("Error searching job salary matric:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
