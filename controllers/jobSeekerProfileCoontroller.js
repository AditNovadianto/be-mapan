import * as jobSeekerProfileModel from "../models/jobSeekerProfileModel.js";
import cloudinary from "../config/cloudinary.js";
import { uploadToCloudinary } from "../utils/uploadCloudinary.js";

export const createJobSeekerProfile = async (req, res) => {
  const { current_job_title, target_job_title, id_job_seeker } = req.body;

  try {
    let cvUrl = null;
    let portfolioUrl = null;

    if (req.files?.cv?.[0]) {
      const cvUpload = await uploadToCloudinary(
        req.files.cv[0].buffer,
        "cv",
        "auto",
      );

      cvUrl = cvUpload;
    }

    if (req.files?.portfolio?.[0]) {
      const portfolioUpload = await uploadToCloudinary(
        req.files.portfolio[0].buffer,
        "portfolio",
        "auto",
      );

      portfolioUrl = portfolioUpload;
    }

    const jobSeekerProfileId =
      await jobSeekerProfileModel.createJobSeekerProfile(
        current_job_title,
        target_job_title,
        cvUrl,
        portfolioUrl,
        id_job_seeker,
      );

    res.status(201).json({
      message: "Job Seeker Profile created successfully",
      id: jobSeekerProfileId,
      current_job_title,
      target_job_title,
      cv: cvUrl,
      portfolio: portfolioUrl,
      id_job_seeker,
    });
  } catch (error) {
    console.error("Error creating job seeker profile:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

// Read
export const getJobSeekerProfileById = async (req, res) => {
  const { id_job_seeker } = req.params;

  try {
    const jobSeekerProfile =
      await jobSeekerProfileModel.getJobSeekerProfileById(id_job_seeker);

    if (!jobSeekerProfile) {
      return res.status(404).json({ error: "Job Seeker Profile not found" });
    }

    return res.status(200).json({ job_seeker_profile: jobSeekerProfile });
  } catch (error) {
    console.error("Error fetching job seeker profile:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Update
export const updateJobSeekerProfile = async (req, res) => {
  const { id_job_seeker_profile } = req.params;
  const { current_job_title, target_job_title } = req.body;

  try {
    const profile = await jobSeekerProfileModel.getJobSeekerProfileById(
      id_job_seeker_profile,
    );

    if (!profile) {
      return res.status(404).json({
        message: "Job seeker profile not found",
      });
    }

    let cvUrl = profile.cv;
    let portfolioUrl = profile.portfolio;

    // Update CV
    if (req.files?.cv?.[0]) {
      const cvUpload = await uploadToCloudinary(
        req.files.cv[0].buffer,
        "cv",
        "auto",
      );

      cvUrl = cvUpload;
    }

    // Update Portfolio
    if (req.files?.portfolio?.[0]) {
      const portfolioUpload = await uploadToCloudinary(
        req.files.portfolio[0].buffer,
        "portfolio",
        "auto",
      );

      portfolioUrl = portfolioUpload;
    }

    await jobSeekerProfileModel.updateJobSeekerProfile(
      id_job_seeker_profile,
      current_job_title,
      target_job_title,
      cvUrl,
      portfolioUrl,
    );

    res.status(200).json({
      message: "Job seeker profile updated successfully",
      id: id_job_seeker_profile,
      current_job_title,
      target_job_title,
      cv: cvUrl,
      portfolio: portfolioUrl,
    });
  } catch (error) {
    console.error("Error updating job seeker profile:", error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
};

// Delete
export const deleteJobSeekerProfile = async (req, res) => {
  const { id_job_seeker_profile } = req.params;

  try {
    const success = await jobSeekerProfileModel.deleteJobSeekerProfile(
      id_job_seeker_profile,
    );

    if (!success) {
      return res.status(404).json({ error: "Job Seeker Profile not found" });
    }

    return res
      .status(200)
      .json({ message: "Job Seeker Profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting job seeker profile:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
