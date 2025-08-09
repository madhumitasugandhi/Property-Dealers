// routes/property.js
import express from "express";
import multer from "multer";
import {
  addProperty,
  getAllProperties,
  getPropertyById,
} from "../controllers/Property.js";
import path from "path";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), addProperty);
router.get("/", getAllProperties);
router.get("/:id", getPropertyById); // Added route for getting a single property

export default router;