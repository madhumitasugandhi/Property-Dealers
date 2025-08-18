import Property from "../models/Property.js";
import path from "path";
import fs from "fs";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), "Uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}${path.extname(file.originalname)}`;
    console.log(`Saving file: ${filename}`); // Debug log
    cb(null, filename);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images and videos are allowed'), false);
    }
  },
});

export const addProperty = async (req, res) => {
  try {
    const { title, location, totalPrice, width, length, area, bhk, floor, propertyType, taluka, description } = req.body;
    console.log('Request body:', req.body); // Debug log
    console.log('Request files:', req.files); // Debug log
    const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    if (!title || !location || !propertyType) {
      return res.status(400).json({ error: "Title, location, and propertyType are required" });
    }

    const parsedTotalPrice = totalPrice ? parseFloat(totalPrice) : null;
    if (totalPrice && isNaN(parsedTotalPrice)) {
      return res.status(400).json({ error: "Invalid totalPrice value" });
    }

    const newProperty = await Property.create({
      title,
      location,
      totalPrice: parsedTotalPrice,
      width: width ? parseFloat(width) : null,
      length: length ? parseFloat(length) : null,
      area: area ? parseFloat(area) : null,
      bhk,
      floor,
      propertyType: propertyType || 'Flat',
      taluka,
      description,
      images,
      created_at: new Date(),
    });

    console.log("Property created:", newProperty.toJSON());
    res.status(201).json(newProperty);
  } catch (error) {
    console.error("Error adding property:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.findAll();
    const normalizedProperties = properties.map(prop => ({
      ...prop.toJSON(),
      images: Array.isArray(prop.images) ? prop.images.map(img => img.replace(/\/uploads\//i, '/Uploads/')) : [],
    }));
    console.log("Fetched properties:", JSON.stringify(normalizedProperties, null, 2));
    res.status(200).json(normalizedProperties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }
    const normalizedProperty = {
      ...property.toJSON(),
      images: Array.isArray(property.images) ? property.images.map(img => img.replace(/\/Uploads\//i, '/Uploads/')) : [],
    };
    console.log("Fetched property by ID:", normalizedProperty);
    res.status(200).json(normalizedProperty);
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findByPk(id);

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    if (property.images && Array.isArray(property.images)) {
      property.images.forEach((image) => {
        const imagePath = path.join(process.cwd(), image);
        try {
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
            console.log(`Deleted image file: ${imagePath}`);
          }
        } catch (err) {
          console.error(`Error deleting image file ${imagePath}:`, err);
        }
      });
    }

    await property.destroy();
    console.log(`Property deleted: ID ${id}`);
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProperty = async (req, res) => {
  try {
    console.log("Received ID for update:", req.params.id);
    console.log("Request body:", req.body);
    console.log("Request files:", req.files);

    const hasFiles = req.headers['content-type']?.includes('multipart/form-data');
    
    if (hasFiles) {
      upload.array('image', 10)(req, res, async (err) => {
        if (err && err.code !== 'LIMIT_UNEXPECTED_FILE') {
          console.error('Multer error:', err);
          return res.status(400).json({ error: 'Image upload failed', details: err.message });
        }
        await processUpdate(req, res);
      });
    } else {
      await processUpdate(req, res);
    }
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const processUpdate = async (req, res) => {
  const { id } = req.params;
  const { title, location, totalPrice, width, length, area, bhk, floor, propertyType, taluka, description, existingImages } = req.body;
  const property = await Property.findByPk(id);

  if (!property) {
    console.log("Property not found for ID:", id);
    return res.status(404).json({ error: "Property not found" });
  }

  let images = property.images || [];
  if (req.files && req.files.length > 0) {
    if (property.images && Array.isArray(property.images)) {
      property.images.forEach((image) => {
        const imagePath = path.join(process.cwd(), image);
        try {
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
            console.log(`Deleted old image file: ${imagePath}`);
          }
        } catch (err) {
          console.error(`Error deleting old image file ${imagePath}:`, err);
        }
      });
    }
    images = req.files.map(file => `/Uploads/${file.filename}`);
    console.log('New images assigned:', images); // Debug log
  } else if (existingImages) {
    try {
      images = JSON.parse(existingImages || '[]');
      if (!Array.isArray(images)) {
        console.warn('existingImages is not an array, resetting to empty array');
        images = [];
      }
      images = images.map(img => img.replace(/\/Uploads\//i, '/Uploads/'));
      console.log('Using existing images:', images); // Debug log
    } catch (err) {
      console.error('Error parsing existingImages:', err);
      images = property.images || [];
    }
  } else {
    console.log('No new files or existingImages provided, keeping existing images:', images); // Debug log
  }

  const parsedTotalPrice = totalPrice ? parseFloat(totalPrice) : property.totalPrice;

  const updatedData = {
    title: title || property.title,
    location: location || property.location,
    totalPrice: parsedTotalPrice,
    width: width ? parseFloat(width) : property.width,
    length: length ? parseFloat(length) : property.length,
    area: area ? parseFloat(area) : property.area,
    bhk: bhk || property.bhk,
    floor: floor || property.floor,
    propertyType: propertyType || property.propertyType,
    taluka: taluka || property.taluka,
    description: description || property.description,
    images,
  };

  console.log('Updating property with data:', updatedData);
  await property.update(updatedData);
  res.status(200).json({ message: 'Property updated successfully', property: { ...property.toJSON(), images } });
};