import { db } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signToken = (job_seeker) => {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not set");
  return jwt.sign(
    {
      sub: job_seeker.id_job_seeker,
      nama_job_seeker: job_seeker.nama_job_seeker,
      email_job_seeker: job_seeker.email_job_seeker,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "15min",
      issuer: "my-app",
      audience: "my-app-users",
      algorithm: "HS256",
    },
  );
};

const sanitizeJobSeeker = (e) => ({
  id_job_seeker: e.id_job_seeker,
  nama_job_seeker: e.nama_job_seeker,
  email_job_seeker: e.email_job_seeker,
  date_of_birth: e.date_of_birth,
  id_platform: e.id_platform,
});

// --- SIGN UP ---
export const signUp = async (req, res) => {
  const {
    nama_job_seeker,
    email_job_seeker,
    password_job_seeker,
    date_of_birth,
  } = req.body;

  try {
    // 1) cek job seeker sudah ada?
    const [existRows] = await db.query(
      "SELECT id_job_seeker FROM job_seeker WHERE email_job_seeker = ? LIMIT 1",
      [email_job_seeker],
    );

    if (existRows.length > 0) {
      return res.status(409).json({ error: "Job Seeker already exists" });
    }

    // 2) hash password
    const hashed = await bcrypt.hash(password_job_seeker, 10);

    // 3) insert job seeker
    const [insertRes] = await db.query(
      "INSERT INTO job_seeker (nama_job_seeker, email_job_seeker, password_job_seeker, date_of_birth, id_platform) VALUES (?, ?, ?, ?, ?)",
      [nama_job_seeker, email_job_seeker, hashed, date_of_birth, 1],
    );

    // 4) ambil job_seeker baru
    const [newJobSeekerRows] = await db.query(
      "SELECT id_job_seeker, nama_job_seeker, email_job_seeker, date_of_birth FROM job_seeker WHERE id_job_seeker = ?",
      [insertRes.insertId],
    );

    const newJobSeeker = newJobSeekerRows[0];

    // 5) buat token
    const token = signToken(newJobSeeker);

    return res
      .status(201)
      .json({ job_seeker: sanitizeJobSeeker(newJobSeeker), token });
  } catch (err) {
    console.error("signUp error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// --- SIGN IN ---
export const signIn = async (req, res) => {
  const { email_job_seeker, password_job_seeker } = req.body;

  try {
    // 1) ambil job seeker
    const [rows] = await db.query(
      "SELECT id_job_seeker, nama_job_seeker, email_job_seeker, password_job_seeker, date_of_birth FROM job_seeker WHERE email_job_seeker = ? LIMIT 1",
      [email_job_seeker],
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Job Seeker not found" });
    }

    const jobSeeker = rows[0];

    // 2) verifikasi password
    const ok = await bcrypt.compare(
      password_job_seeker,
      jobSeeker.password_job_seeker,
    );

    if (!ok) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // 3) buat token
    const token = signToken(jobSeeker);

    return res
      .status(200)
      .json({ job_seeker: sanitizeJobSeeker(jobSeeker), token });
  } catch (err) {
    console.error("signIn error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllJobSeekers = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id_job_seeker, nama_job_seeker, email_job_seeker, date_of_birth, id_platform FROM job_seeker",
    );

    return res.status(200).json({ job_seekers: rows });
  } catch (err) {
    console.error("getAllJobSeekers error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
