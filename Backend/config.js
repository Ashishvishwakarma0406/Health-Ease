// Backend/config.js
import dotenv from "dotenv";
dotenv.config();

export const database = process.env.MONGODB_URI;  // from .env
export const jwtSecret = process.env.JWT_SECRET; // for JWT auth
