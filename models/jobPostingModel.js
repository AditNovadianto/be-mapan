import { db } from "../config/db.js";

// Create
export async function createJobPosting(
  nama_job_posting,
  start_job_posting,
  end_job_posting,
  requirements,
  total_needs,
  salary,
  description,
) {
  try {
    const [result] = await db.query(
      "INSERT INTO job_posting (nama_job_posting, start_job_posting, end_job_posting, requirements, total_needs, salary, description, id_platform) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        nama_job_posting,
        start_job_posting,
        end_job_posting,
        requirements,
        total_needs,
        salary,
        description,
        1,
      ],
    );

    return result.insertId;
  } catch (error) {
    console.error("Error creating job posting:", error);
    throw error;
  }
}

// Read
export async function getAllJobPostings() {
  try {
    const [rows] = await db.query("SELECT * FROM job_posting");

    return rows;
  } catch (error) {
    console.error("Error fetching job posting:", error);
    throw error;
  }
}

// Update
export async function updateJobPosting(
  id_job_posting,
  nama_job_posting,
  start_job_posting,
  end_job_posting,
  requirements,
  total_needs,
  salary,
  description,
) {
  try {
    const [result] = await db.query(
      "UPDATE job_posting SET nama_job_posting = ?, start_job_posting = ?, end_job_posting = ?, requirements = ?, total_needs = ?, salary = ?, description = ? WHERE id_job_posting = ?",
      [
        nama_job_posting,
        start_job_posting,
        end_job_posting,
        requirements,
        total_needs,
        salary,
        description,
        id_job_posting,
      ],
    );

    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error updating job posting:", error);
    throw error;
  }
}

// Delete
export async function deleteJobPosting(id_job_posting) {
  try {
    const [result] = await db.query(
      "DELETE FROM job_posting WHERE id_job_posting = ?",
      [id_job_posting],
    );

    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error deleting job_posting:", error);
    throw error;
  }
}
