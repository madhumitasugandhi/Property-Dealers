import { Broker } from '../models/index.js';

export const createBroker = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const status = req.body.status || "Active"; // default
    const existingBroker = await Broker.findOne({ where: { email } });

    if (existingBroker) {
      return res.status(400).json({ message: "Broker with this email already exists" });
    }
    const broker = await Broker.create({ name, email, phone, address, status });
    res.status(201).json(broker);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const getBrokers = async (req, res) => {
  try {
    const brokers = await Broker.findAll();
    res.json(brokers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBroker = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address, status } = req.body;
    const broker = await Broker.findByPk(id);
    if (!broker) {
      return res.status(404).json({ message: 'Broker not found' });
    }
    await broker.update({ name, email, phone, address, status });
    res.json(broker);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBroker = async (req, res) => {
  try {
    const { id } = req.params;
    const broker = await Broker.findByPk(id);
    if (!broker) {
      return res.status(404).json({ message: 'Broker not found' });
    }
    await broker.destroy();
    res.json({ message: 'Broker deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { createBroker, getBrokers, updateBroker, deleteBroker };