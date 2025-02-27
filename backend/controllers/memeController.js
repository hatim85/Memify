import Meme from "../models/memeModel.js";
import User from "../models/userModel.js";
import multer from "multer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { generateMemeWithAI, openai } from "../aiMemeGenerator.js";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import path from "path";
import sharp from "sharp"

dotenv.config();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const createMeme = async (req, res) => {
  try {
    console.log("Received file:", req.file);
    console.log("Request Body:", req.body);
    console.log("req.user: ", req.user)

    const { title, description, templateName } = req.body;

    if (!title || !req.file) {
      return res.status(400).json({ message: "Title and template are required" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    // Find the user
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create new meme
    const meme = new Meme({
      title,
      description,
      template: `/uploads/${req.file.filename}`,
      templateName,
      isNFT: true,
      creator: user._id, // Link to the logged-in user
    });

    // Save meme
    await meme.save();

    // Add meme to user's createdMemes array
    user.createdMemes.push(meme._id);
    await user.save();

    await meme.populate("creator", "address");

    res.status(201).json(meme);
  } catch (error) {
    console.error("Error creating meme:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const forkMeme = async (req, res) => {
  try {
    console.log("🚀 Received fork request:", req.body);

    const { memeId, newTitle, newDescription, isNFT } = req.body;
    const userId = req.user?.userId; // Get user ID from request

    // Fetch the original meme
    console.log(`🔍 Fetching original meme with ID: ${memeId}`);
    const originalMeme = await Meme.findById(memeId);
    if (!originalMeme) {
      console.log("❌ Original meme not found.");
      return res.status(404).json({ message: "Original meme not found" });
    }
    console.log("✅ Found original meme:", originalMeme);

    let newTemplate = originalMeme.template;
    const imagePath = originalMeme.template.startsWith("http")
      ? originalMeme.template
      : path.join(process.cwd(), originalMeme.template);

    if (!fs.existsSync(imagePath)) {
      console.log("❌ Error: Meme image not found on server:", imagePath);
      return res.status(400).json({ message: "Original meme image not found on server" });
    }

    console.log("📤 Sending local image to OpenAI for variation...");
    const aiResponse = await openai.images.createVariation({
      model: "dall-e-2",
      image: fs.createReadStream(imagePath),
      n: 1,
      size: "1024x1024",
    });

    if (aiResponse?.data?.[0]?.url) {
      newTemplate = aiResponse.data[0].url;
      console.log("✅ AI-edited meme generated:", newTemplate);
    } else {
      console.log("❌ AI did not return a valid image URL.");
      return res.status(500).json({ message: "AI did not return a valid image URL" });
    }

    // Save forked meme
    console.log("📝 Saving forked meme...");
    const forkedMeme = new Meme({
      title: newTitle || `Forked - ${originalMeme.title}`,
      description: newDescription || originalMeme.description,
      template: newTemplate,
      templateName: `Forked - ${originalMeme.templateName}`,
      creator: userId || "Unknown",
      isNFT: isNFT || false,
    });

    await forkedMeme.save();
    console.log("✅ Forked meme saved successfully:", forkedMeme);

    // ✅ Add the meme to the User's createdMemes array
    if (userId) {
      const user = await User.findById(userId);
      if (user) {
        user.createdMemes.push(forkedMeme._id);
        await user.save();
        console.log("✅ Meme added to user’s createdMemes array.");
      } else {
        console.log("❌ User not found. Meme not added to createdMemes.");
      }
    }

    res.status(201).json(forkedMeme);
  } catch (error) {
    console.error("❌ Error forking meme:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getMeme = async (req, res) => {
  try {
    const meme = await Meme.findById(req.params.id).populate("creator", "username");
    if (!meme) return res.status(404).json({ message: "Meme not found" });

    res.status(200).json(meme);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete Meme
const deleteMeme = async (req, res) => {
  try {
    const meme = await Meme.findByIdAndDelete(req.params.id);
    if (!meme) {
      return res.status(404).json({ message: "Meme not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const mynfts = async (req, res) => {
  try {
    console.log("mynfts in backend")
    console.log("User in request:", req.user); // Debugging line

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    const user = await User.findById(req.user.userId).populate("createdMemes");
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.createdMemes);
  } catch (error) {
    console.error("Error fetching memes:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

const getAllMemes = async (req, res) => {
  try {
    console.log("📢 Fetching all memes excluding user's own...");
    console.log("req.user", req.user)
    const userId = req.user.userId; // Get logged-in user's ID

    const memes = await Meme.find({ creator: { $ne: userId } }) // Exclude user's own memes
      .populate("creator", "username address");

    if (!memes.length) {
      return res.status(404).json({ message: "No memes found" });
    }

    res.status(200).json(memes);
  } catch (error) {
    console.error("❌ Error fetching memes:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// Export functions
export { createMeme, forkMeme, getMeme, deleteMeme, upload, mynfts, getAllMemes };
