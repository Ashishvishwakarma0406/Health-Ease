import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import userRoutes from './routes/users.js';
import doctorRoutes from './routes/doctors.js';
import User from './models/userModel.js';
import bcrypt from 'bcrypt';
import { database } from './config.js';

dotenv.config();

const app = express();
const PORT = 5000;

// Static Path
const dirname = path.dirname(fileURLToPath(import.meta.url));
const buildpath = path.join(dirname, "../Frontend/dist");

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static(buildpath));

// Routes

app.get("/start-analyzer", (req, res) => {
  const port = 5081; // Set Streamlit Port
  const command = `streamlit run Backend/report_analyzer/medical_analyzer.py --server.port ${port} --server.headless true`;

  const streamlitProcess = exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error starting Streamlit: ${error.message}`);
      return res.status(500).json({ message: "❌ Failed to start Report Analyzer" });
    }

    if (stderr) {
      console.error(`Streamlit error: ${stderr}`);
    }

    console.log(stdout); // Log the Streamlit output (optional for debugging)
  });

  // Optional: Check if the port is open and Streamlit is ready (by pinging the port)
  setTimeout(() => {
    res.json({ message: `✅ Report Analyzer started on http://localhost:${port}` });
  }, 3000); // Adjust or verify delay to check if the app is fully initialized
});

// Register route
app.post('/register', async (req, res) => {
  try {
    const { uniqueId, username, email, phoneNo, password } = req.body;

    if (!uniqueId || !username || !email || !phoneNo || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const existingUser = await User.findOne({ $or: [{ uniqueId }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this username or email.' });
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
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User and Doctor routes
app.use('/api/users', userRoutes);
app.use('/api/doctors', doctorRoutes);

// Connect to the database
mongoose.connect(database)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });