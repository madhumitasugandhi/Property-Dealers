// backend/controllers/Property.js
import Property from "../models/Property.js";
import path from "path";
import fs from "fs";
import multer from "multer";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

export const addProperty = async (req, res) => {
  try {
    const { title, location, totalPrice, width, length, area, bhk, floor, propertyType, taluka, description } = req.body; // Changed 'type' to 'propertyType'
    const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    // Validate required fields
    if (!title || !location || !propertyType) { // Added propertyType to required fields
      return res.status(400).json({ error: "Title, location, and propertyType are required" });
    }

    // Parse totalPrice and ensure it's a valid number or null
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
      propertyType: propertyType || 'Flat', // Default to 'Flat' if not provided
      taluka,
      description,
      images: images.length > 0 ? images : [],
      image_path: images.length > 0 ? images[0] : null,
      created_at: new Date(),
    });

    res.status(201).json(newProperty);
  } catch (error) {
    console.error("Error adding property:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.findAll();
    console.log("Fetched properties:", JSON.stringify(properties, null, 2));
    res.status(200).json(properties);
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
    res.status(200).json(property);
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

    if (property.images) {
      const imagePath = path.join(process.cwd(), property.images);
      try {
        fs.unlinkSync(imagePath);
      } catch (err) {
        console.error("Error deleting image file:", err);
      }
    }

    await property.destroy();
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

    // Use upload.array('image') to handle multiple images
    upload.array('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: 'Image upload failed', details: err.message });
      }
      await processUpdate(req, res);
    });
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Helper function to process the update logic
const processUpdate = async (req, res) => {
  const { id } = req.params;
  const { title, location, totalPrice, width, length, area, bhk, floor, propertyType, taluka, description } = req.body;
  const property = await Property.findByPk(id);

  if (!property) {
    console.log("Property not found for ID:", id);
    return res.status(404).json({ error: "Property not found" });
  }

  // Handle image updates
  let images = property.images || [];
  if (req.files && req.files.length > 0) {
    // Delete old images if they exist
    if (property.image_path) {
      const oldImagePath = path.join(process.cwd(), property.image_path);
      try {
        fs.unlinkSync(oldImagePath);
      } catch (err) {
        console.error("Error deleting old image file:", err);
      }
    }
    // Update images array with new files
    images = req.files.map(file => `/uploads/${file.filename}`);
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
    images: images.length > 0 ? images : property.images,
    image_path: images.length > 0 ? images[0] : property.image_path,
  };

  await property.update(updatedData);
  res.status(200).json({ message: 'Property updated successfully', property });
};