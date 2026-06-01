import { db } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signToken = (employeer) => {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not set");
  return jwt.sign(
    {
      sub: employeer.id_employeer,
      nama_employeer: employeer.nama_employeer,
      email_employeer: employeer.email_employeer,
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

const sanitizeEmployeer = (e) => ({
  id_employeer: e.id_employeer,
  nama_employeer: e.nama_employeer,
  email_employeer: e.email_employeer,
  id_platform: e.id_platform,
});

// --- SIGN UP ---
export const signUp = async (req, res) => {
  const { nama_employeer, email_employeer, password_employeer } = req.body;

  try {
    // 1) cek employeer sudah ada?
    const [existRows] = await db.query(
      "SELECT id_employeer FROM employeer WHERE email_employeer = ? LIMIT 1",
      [email_employeer],
    );

    if (existRows.length > 0) {
      return res.status(409).json({ error: "Employeer already exists" });
    }

    // 2) hash password
    const hashed = await bcrypt.hash(password_employeer, 10);

    // 3) insert employeer
    const [insertRes] = await db.query(
      "INSERT INTO employeer (nama_employeer, email_employeer, password_employeer, id_platform) VALUES (?, ?, ?, ?)",
      [nama_employeer, email_employeer, hashed, 1],
    );

    // 4) ambil employeer baru
    const [newEmployeerRows] = await db.query(
      "SELECT id_employeer, nama_employeer, email_employeer FROM employeer WHERE id_employeer = ?",
      [insertRes.insertId],
    );

    const newEmployeer = newEmployeerRows[0];

    // 5) buat token
    const token = signToken(newEmployeer);

    return res
      .status(201)
      .json({ employeer: sanitizeEmployeer(newEmployeer), token });
  } catch (err) {
    console.error("signUp error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// --- SIGN IN ---
export const signIn = async (req, res) => {
  const { email_employeer, password_employeer } = req.body;

  try {
    // 1) ambil employeer
    const [rows] = await db.query(
      "SELECT id_employeer, nama_employeer, email_employeer, password_employeer FROM employeer WHERE email_employeer = ? LIMIT 1",
      [email_employeer],
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Employeer not found" });
    }

    const employeer = rows[0];

    // 2) verifikasi password
    const ok = await bcrypt.compare(
      password_employeer,
      employeer.password_employeer,
    );

    if (!ok) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // 3) buat token
    const token = signToken(employeer);

    return res
      .status(200)
      .json({ employeer: sanitizeEmployeer(employeer), token });
  } catch (err) {
    console.error("signIn error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllEmployeers = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id_employeer, nama_employeer, email_employeer, id_platform FROM employeer",
    );

    return res.status(200).json({ employeers: rows });
  } catch (err) {
    console.error("getAllEmployeers error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
