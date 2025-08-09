// controllers/sellerController.js
import SellerProperty from '../models/Seller.js';

export const createSellerProperty = async (req, res) => {
  try {
    console.log("Files uploaded:", req.files);
    console.log("Body:", req.body);

    const propertyData = {
      name: req.body.name,
      phone: req.body.phone,
      location: req.body.location,
      width: parseFloat(req.body.width) || null,
      length: parseFloat(req.body.length) || null,
      area: parseFloat(req.body.area) || (req.body.width && req.body.length ? parseFloat(req.body.width) * parseFloat(req.body.length) : null),
      bhk: req.body.bhk || null,
      floor: req.body.floor || null,
      pricePerSqft: parseFloat(req.body.pricePerSqft) || null,
      propertyType: req.body.propertyType,
      images: req.files?.map((file) => file.filename) || [],
      totalPrice: parseFloat(req.body.totalPrice) || (req.body.width && req.body.length && req.body.pricePerSqft ? parseFloat(req.body.width) * parseFloat(req.body.length) * parseFloat(req.body.pricePerSqft) : null),
    };

    console.log("Property data to save:", propertyData);
    const newProperty = await SellerProperty.create(propertyData);
    console.log("Saved property:", newProperty);
    res.status(201).json({ message: "Property added successfully", property: newProperty });
  } catch (err) {
    console.error("Error in createSellerProperty:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getAllSellerProperties = async (req, res) => {
  try {
    const properties = await SellerProperty.findAll();
    res.json(properties);
  } catch (error) {
    console.error('Error fetching sellers:', error);
    res.status(500).json({ message: error.message });
  }
};