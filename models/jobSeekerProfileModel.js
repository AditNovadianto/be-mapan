import { db } from "../config/db.js";

// Create
export async function createJobSeekerProfile(
  current_job_title,
  target_job_title,
  cv,
  portfolio,
  id_job_seeker,
) {
  try {
    const [result] = await db.query(
      "INSERT INTO job_seeker_profile (current_job_title, target_job_title, cv, portfolio, id_job_seeker) VALUES (?, ?, ?, ?, ?)",
      [current_job_title, target_job_title, cv, portfolio, id_job_seeker],
    );

    return result.insertId;
  } catch (error) {
    console.error("Error creating job seeker profile:", error);
    throw error;
  }
}

// Read
export async function getJobSeekerProfileById(id_job_seeker) {
  try {
    const [rows] = await db.query(
      "SELECT * FROM job_seeker_profile WHERE id_job_seeker = ?",
      [id_job_seeker],
    );

    return rows[0];
  } catch (error) {
    console.error("Error fetching job seeker profile:", error);
    throw error;
  }
}

// Update
export async function updateJobSeekerProfile(
  id_job_seeker_profile,
  current_job_title,
  target_job_title,
  cv,
  portfolio,
) {
  try {
    const [result] = await db.query(
      "UPDATE job_seeker_profile SET current_job_title = ?, target_job_title = ?, cv = ?, portfolio = ? WHERE id_job_seeker_profile = ?",
      [
        current_job_title,
        target_job_title,
        cv,
        portfolio,
        id_job_seeker_profile,
      ],
    );

    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error updating job seeker profile:", error);
    throw error;
  }
}

// Delete
export async function deleteJobSeekerProfile(id_job_seeker_profile) {
  try {
    const [result] = await db.query(
      "DELETE FROM job_seeker_profile WHERE id_job_seeker_profile = ?",
      [id_job_seeker_profile],
    );

    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error deleting job seeker profile:", error);
    throw error;
  }
}
