import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./config/db.js";
import employeerRoute from "./routes/employeerRoute.js";
import jobSeekerRoute from "./routes/jobSeekerRoute.js";
import jobPostingRoute from "./routes/jobPostingRoute.js";
import jobSeekerProfileRoute from "./routes/jobSeekerProfileRoute.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Test database SQL connection
async function testDBConnection() {
  try {
    await db.query("SELECT 1");
    console.log("✅ Database SQL connected successfully!");
    return true;
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error.message);
    return false;
  }
}

testDBConnection();
//

// Test database MongoDB connection
// connectMongoDB();
//

app.get("/", (req, res) => {
  res.send("Welcome to the Mapan API");
});

app.use(employeerRoute);
app.use(jobSeekerRoute);
app.use(jobPostingRoute);
app.use(jobSeekerProfileRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
