import Contact from '../models/Contact.js';

// Submit contact form
exports.submitContactForm = async (req, res) => {
  try {
    const { name, phone, flats, preferredLocations, requirements } = req.body;

    await Contact.create({
      name,
      phone,
      flats: JSON.stringify(flats), // Store array as JSON string
      preferredLocations: JSON.stringify(preferredLocations), // Store array as JSON string
      requirements,
    });

    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all contact messages for admin
exports.getContactMessages = async (req, res) => {
  try {
    const messages = await Contact.findAll({
      order: [['createdAt', 'DESC']],
    });

    // Parse JSON strings back to arrays
    const formattedMessages = messages.map((msg) => ({
      id: msg.id,
      name: msg.name,
      phone: msg.phone,
      flats: msg.flats ? JSON.parse(msg.flats) : [],
      preferredLocations: msg.preferredLocations ? JSON.parse(msg.preferredLocations) : [],
      requirements: msg.requirements,
      createdAt: msg.createdAt,
    }));

    res.status(200).json(formattedMessages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};