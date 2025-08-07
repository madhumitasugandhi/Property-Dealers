import { Seller, Property, PropertyType } from '../models/index.js';

export const createSeller = async (req, res) => {
  try {
    const { name, email, address, property_id, price, type_id, location, status } = req.body;
    const seller = await Seller.create({ name, email, address, property_id, price, type_id, location, status });
    res.status(201).json(seller);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getSellers = async (req, res) => {
  try {
    const sellers = await Seller.findAll({
      include: [{ model: Property }, { model: PropertyType }],
    });
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSeller = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, address, property_id, price, type_id, location, status } = req.body;
    const seller = await Seller.findByPk(id);
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }
    await seller.update({ name, email, address, property_id, price, type_id, location, status });
    res.json(seller);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteSeller = async (req, res) => {
  try {
    const { id } = req.params;
    const seller = await Seller.findByPk(id);
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }
    await seller.destroy();
    res.json({ message: 'Seller deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};