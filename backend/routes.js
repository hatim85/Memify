import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the Vite build directory
router.use(express.static(path.join(__dirname, "../vite-frontend/dist")));

// Handle client-side routing by serving index.html for all routes
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../vite-frontend/dist/index.html"));
});

export default router;