import { db } from "../config/db.js";

// Create
export async function createJobSalaryMatric(
  job_title,
  location,
  mean_salary,
  company_name,
  id_job_posting,
) {
  try {
    const [result] = await db.query(
      "INSERT INTO job_salary_matric (job_title, location, mean_salary, company_name, id_job_posting) VALUES (?, ?, ?, ?, ?)",
      [job_title, location, mean_salary, company_name, id_job_posting],
    );
    return result.insertId;
  } catch (error) {
    console.error("Error creating job salary metric:", error);
    throw error;
  }
}

// Read
export async function getJobSalaryMatricByJobPostingId(id_job_posting) {
  try {
    const [rows] = await db.query(
      "SELECT * FROM job_salary_matric WHERE id_job_posting = ?",
      [id_job_posting],
    );
    return rows;
  } catch (error) {
    console.error("Error fetching job salary metric:", error);
    throw error;
  }
}

// Update
export async function updateJobSalaryMatric(
  id_job_salary_matric,
  job_title,
  location,
  mean_salary,
  company_name,
) {
  try {
    const [result] = await db.query(
      "UPDATE job_salary_matric SET job_title = ?, location = ?, mean_salary = ?, company_name = ? WHERE id_job_salary_matric = ?",
      [job_title, location, mean_salary, company_name, id_job_salary_matric],
    );
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error updating job salary metric:", error);
    throw error;
  }
}

// Delete
export async function deleteJobSalaryMatric(id_job_salary_matric) {
  try {
    const [result] = await db.query(
      "DELETE FROM job_salary_matric WHERE id_job_salary_matric = ?",
      [id_job_salary_matric],
    );
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error deleting job salary metric:", error);
    throw error;
  }
}
