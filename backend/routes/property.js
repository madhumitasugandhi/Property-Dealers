import express from 'express';
import { addProperty, getAllProperties, getPropertyById, deleteProperty, updateProperty } from '../controllers/Property.js';
import path from 'path';
import multer from 'multer';
import fs from 'fs';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'Uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}${path.extname(file.originalname)}`;
    console.log(`Multer saving file: ${filename}`); // Debug log
    cb(null, filename);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    console.log(`Processing file: ${file.originalname}, type: ${file.mimetype}`); // Debug log
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images and videos are allowed'), false);
    }
  },
});

router.post('/', upload.array('image', 10), addProperty);
router.get('/', getAllProperties);
router.get('/:id', getPropertyById);
router.delete('/:id', deleteProperty);
router.put('/:id', (req, res, next) => {
  console.log('PUT request headers:', req.headers); // Debug log
  if (req.headers['content-type']?.includes('multipart/form-data')) {
    upload.array('image', 10)(req, res, next);
  } else {
    next();
  }
}, updateProperty);

export default router;