// controllers/Property.js
import Property from "../models/Property.js";
import path from "path";

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