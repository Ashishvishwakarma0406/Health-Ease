import jwt from "jsonwebtoken";
import { jwtSecret } from "../config.js";

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.redirect('/apiusers/login');
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; // Attach user details to request object
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
