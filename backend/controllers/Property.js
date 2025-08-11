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
    const { title, location, price, width, length, area, bhk, floor, type } = req.body;
    const image_path = req.file ? `/uploads/${req.file.filename}` : null;

    const newProperty = await Property.create({
      title,
      location,
      price,
      width,
      length,
      area,
      bhk,
      floor,
      type,
      image_path,
    });

    res.status(201).json(newProperty);
  } catch (error) {
    console.error("Error adding property:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.findAll();
    console.log("Fetched properties:", properties);
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

    if (property.image_path) {
      const imagePath = path.join(process.cwd(), property.image_path);
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

    // Check if the request contains multipart/form-data with an image
    if (req.headers['content-type']?.includes('multipart/form-data')) {
      upload.single('image')(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ error: 'Image upload failed', details: err.message });
        }
        await processUpdate(req, res);
      });
    } else {
      // Handle non-multipart requests (e.g., JSON or no image)
      await processUpdate(req, res);
    }
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Helper function to process the update logic
const processUpdate = async (req, res) => {
  const { id } = req.params;
  const { title, location, price, width, length, area, bhk, floor, type, description } = req.body;
  const property = await Property.findByPk(id);

  if (!property) {
    console.log("Property not found for ID:", id);
    return res.status(404).json({ error: "Property not found" });
  }

  // Delete old image if a new one is uploaded
  if (req.file && property.image_path) {
    const oldImagePath = path.join(process.cwd(), property.image_path);
    try {
      fs.unlinkSync(oldImagePath);
    } catch (err) {
      console.error("Error deleting old image file:", err);
    }
  }

  const updatedData = {
    title: title || property.title,
    location: location || property.location,
    price: price || property.price,
    width: width || property.width,
    length: length || property.length,
    area: area || property.area,
    bhk: bhk || property.bhk,
    floor: floor || property.floor,
    type: type || property.type,
    description: description || property.description,
    image_path: req.file ? `/uploads/${req.file.filename}` : property.image_path,
  };

  await property.update(updatedData);
  res.status(200).json({ message: 'Property updated successfully', property });
};