import * as cvModel from "../models/cvModel.js";
import { PDFParse } from "pdf-parse";
import dotenv from "dotenv";

dotenv.config();

// Extract
export const generateCVJSON = async (req, res) => {
  try {
    const cv = req.files?.cv?.[0];

    if (!cv) {
      return res.status(400).json({
        message: "File CV wajib diupload",
      });
    }

    const parser = new PDFParse({
      data: cv.buffer,
    });

    const result = await parser.getText();

    const cvJSON = await cvModel.generateCVJSON(result.text);

    const responseExternalAPI = await fetch(
      `${process.env.EXTERNAL_API_URL}/parse/cv`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          raw_text: cvJSON.raw_text,
        }),
      },
    );

    const externalResult = await responseExternalAPI.json();

    return res.status(200).json({
      message: "CV berhasil diextract",
      data: cvJSON,
      external_data: externalResult,
    });
  } catch (error) {
    console.error("Error generating CV JSON:", error);

    return res.status(500).json({
      message: "Terjadi kesalahan saat memproses CV",
      error: error.message,
    });
  }
};

// Recommend Career
export const recommendCareer = async (req, res) => {
  try {
    const cv = req.files?.cv?.[0];

    if (!cv) {
      return res.status(400).json({
        message: "File CV wajib diupload",
      });
    }

    const parser = new PDFParse({
      data: cv.buffer,
    });

    const result = await parser.getText();

    const cvJSON = await cvModel.generateCVJSON(result.text);

    const responseExternalAPIParseCV = await fetch(
      `${process.env.EXTERNAL_API_URL}/parse/cv`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          raw_text: cvJSON.raw_text,
        }),
      },
    );

    const externalParseCVResult = await responseExternalAPIParseCV.json();

    const responseExternalAPIRecommendCarrer = await fetch(
      `${process.env.EXTERNAL_API_URL}/recommend/career`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          skills: externalParseCVResult.skills,
          top_k: 5,
        }),
      },
    );

    const externalRecommendCareerResult =
      await responseExternalAPIRecommendCarrer.json();

    return res.status(200).json({
      message: "Rekomendasi karir berhasil diambil",
      data: externalRecommendCareerResult,
    });
  } catch (error) {
    console.error("Error recommending career:", error);

    return res.status(500).json({
      message: "Terjadi kesalahan saat mengambil rekomendasi karir",
      error: error.message,
    });
  }
};

// Predict Salary
export const predictSalary = async (req, res) => {
  const { job_title, company, location } = req.body;

  try {
    const responseExternalAPI = await fetch(
      `${process.env.EXTERNAL_API_URL}/predict/salary`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          job_title,
          company,
          location,
        }),
      },
    );

    const externalResult = await responseExternalAPI.json();

    return res.status(200).json({
      message: "Prediksi gaji berhasil diambil",
      data: externalResult,
    });
  } catch (error) {
    console.error("Error predicting salary:", error);

    return res.status(500).json({
      message: "Terjadi kesalahan saat memprediksi gaji",
      error: error.message,
    });
  }
};
