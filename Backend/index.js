// Backend/index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { exec } from "child_process";

import userRoutes from "./routes/users.js";
import doctorRoutes from "./routes/doctors.js";
import User from "./models/userModel.js";
import bcrypt from "bcrypt";
import { database } from "./config.js"; // DB from .env/config

// Load env variables
dotenv.config();

// Core setup
const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";
const CLIENT_URL = process.env.CLIENT_URL || "*";

// Path setup
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const buildPath = path.join(__dirname, "../Frontend/dist");

// Middleware
const corsOptions = {
  origin: NODE_ENV === "production" ? CLIENT_URL : "*",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Serve frontend (only in production)
if (NODE_ENV === "production" && fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
}

// ⚠️ Local-only route for launching Streamlit analyzer
app.get("/start-analyzer", (req, res) => {
  if (NODE_ENV === "production") {
    return res.status(403).json({
      message:
        "Disabled in production. Deploy the Streamlit analyzer separately and set REPORT_ANALYZER_URL in env.",
    });
  }

  const port = process.env.REPORT_ANALYZER_PORT || 5081;
  const scriptPath = path.join(
    __dirname,
    "report_analyzer",
    "medical_analyzer.py"
  );
  const command = `streamlit run ${scriptPath} --server.port ${port} --server.headless true`;

  const streamlitProcess = exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error starting Streamlit: ${error.message}`);
      return;
    }
    if (stderr) console.error(`Streamlit stderr: ${stderr}`);
    console.log(stdout);
  });

  setTimeout(() => {
    res.json({ message: `Report Analyzer started on http://localhost:${port}` });
  }, 3000);
});

// --- Auth/Register Route (basic)
app.post("/register", async (req, res) => {
  try {
    const { uniqueId, username, email, phoneNo, password } = req.body;

    if (!uniqueId || !username || !email || !phoneNo || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const existingUser = await User.findOne({
      $or: [{ uniqueId }, { username }, { email }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User already exists with this ID, username, or email." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      uniqueId,
      username,
      email,
      phoneNo,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// --- API Routes
app.use("/api/users", userRoutes);
app.use("/api/doctors", doctorRoutes);

// --- MongoDB connection
const DB_URI = process.env.MONGODB_URI || database;


mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (NODE_ENV=${NODE_ENV})`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });
