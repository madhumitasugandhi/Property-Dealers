import express from 'express';
import multer from 'multer';
import { addProperty, getAllProperties } from '../controllers/Property.js';
import path from 'path';

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/', upload.single('image'), addProperty);
router.get('/', getAllProperties);

export default router;
