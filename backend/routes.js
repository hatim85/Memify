import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { signin,signup,signout } from "./controllers/userController.js";
import multer from "multer";
import authenticateUser from "./authenticateUser.js";
import { createMeme, deleteMeme, forkMeme, getAllMemes, getMeme, mynfts } from "./controllers/memeController.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the Vite build directory
router.use(express.static(path.join(__dirname, "../vite-frontend/dist")));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Save images in the 'uploads/' folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
  });
  
  const upload = multer({ storage: storage });

// router.post('/users', createUser);
router.post('/signin', signin);
router.post('/signup', signup);
router.post('/signout',signout);

router.post("/create",authenticateUser,upload.single("template"), createMeme);
router.post("/fork",authenticateUser, forkMeme);
router.get("/viewnft",authenticateUser,getAllMemes)

router.get('/memes/:id',authenticateUser, getMeme);
router.get("/mynfts",authenticateUser,mynfts);
router.delete("/:id", deleteMeme);
router.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send("File uploaded successfully!");
});


export default router;