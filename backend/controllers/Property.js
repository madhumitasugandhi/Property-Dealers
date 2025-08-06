import { Property, PropertyType } from '../models/index.js';


export const createProperty = async (req, res) => {
  try {
    const { type_id, price, location, status, bhk } = req.body;
    const property = await Property.create({ type_id, price, location, status, bhk });
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getProperties = async (req, res) => {
  try {
    const properties = await Property.findAll({
      include: [{ model: PropertyType }],
    });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const { type_id, price, location, status, bhk } = req.body;
    const property = await Property.findByPk(id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    await property.update({ type_id, price, location, status, bhk });
    res.json(property);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findByPk(id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    await property.destroy();
    res.json({ message: 'Property deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};