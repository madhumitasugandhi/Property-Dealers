// controllers/Property.js
import Property from "../models/Property.js";
import path from "path";
import fs from "fs";

export const addProperty = async (req, res) => {
  try {
    const {
      title,
      location,
      price,
      width,
      length,
      area,
      bhk,
      floor,
      type,
    } = req.body;

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
    console.log("Fetched properties:", properties); // Debug log
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

    // Delete the image file from uploads folder if it exists
    if (property.image_path) {
      const imagePath = path.join(process.cwd(), property.image_path);
      try {
        fs.unlinkSync(imagePath);
      } catch (err) {
        console.error("Error deleting image file:", err);
      }
    }

    // Delete the property from the database
    await property.destroy();

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Property.update(req.body, { where: { id } });

    if (!updated) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json({ message: 'Property updated successfully' });
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
