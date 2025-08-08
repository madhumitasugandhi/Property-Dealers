import Buyer from '../models/Buyer.js';

export const createBuyer = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      property_type,
      location,
      bhk,
      area,
      price
    } = req.body;

    const buyer = await Buyer.create({
      name,
      email,
      phone,
      address,
      property_type,
      location,
      bhk,
      area,
      price
    });

    res.status(201).json({ message: 'Buyer created successfully', buyer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create buyer', error });
  }
};

export const getAllBuyers = async (req, res) => {
  try {
    const buyers = await Buyer.findAll({ order: [['created_at', 'DESC']] });
    res.json(buyers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch buyers', error });
  }
};
