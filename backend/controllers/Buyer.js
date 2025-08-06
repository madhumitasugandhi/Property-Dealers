import Buyer from '../models/Buyer.js';

export const createBuyer = async (req, res) => {
  try {
    const { name, email, phoneno, address, type_id, location, area, status, bhk } = req.body;
    const buyer = await Buyer.create({ name, email, phoneno, address, type_id, location, area, status, bhk });
    res.status(201).json(buyer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getBuyers = async (req, res) => {
  try {
    const buyers = await Buyer.findAll();
    res.json(buyers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};