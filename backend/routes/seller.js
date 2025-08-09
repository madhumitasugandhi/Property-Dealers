// routes/seller.js
import express from "express";
import multer from "multer";
import path from "path";
import { createSellerProperty, getAllSellerProperties} from "../controllers/Seller.js";

const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Route for creating seller property
router.post("/", upload.array("media", 10), createSellerProperty);
// Get all sellers
router.get("/", getAllSellerProperties);
  
export default router;
