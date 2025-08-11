import express from "express";
import {
  addProperty,
  getAllProperties,
  getPropertyById,
  deleteProperty,
  updateProperty,
} from "../controllers/Property.js";
import path from "path";
import multer from "multer";

const router = express.Router();

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
router.get("/:id", getPropertyById);
router.delete("/:id", deleteProperty);
router.put("/:id", updateProperty); 

export default router;