import Contact from '../models/Contact.js';

// Submit contact form
export const submitContactForm = async (req, res) => {
  try {
    const { name, phone, flats, preferredLocations, requirements } = req.body;

    await Contact.create({
      name,
      phone,
      flats: flats ? JSON.stringify(flats) : null, // Handle empty arrays
      preferredLocations: preferredLocations ? JSON.stringify(preferredLocations) : null,
      requirements,
    });

    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error in submitContactForm:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all contact messages for admin
export const getContactMessages = async (req, res) => {
  try {
    const messages = await Contact.findAll({
      order: [['createdAt', 'DESC']],
    });

    // Parse JSON strings back to arrays
    const formattedMessages = messages.map((msg) => {
      let flats = [];
      let preferredLocations = [];
      try {
        flats = msg.flats ? JSON.parse(msg.flats) : [];
        preferredLocations = msg.preferredLocations ? JSON.parse(msg.preferredLocations) : [];
      } catch (parseError) {
        console.error(`Error parsing JSON for contact ID ${msg.id}:`, parseError);
      }
      return {
        id: msg.id,
        name: msg.name,
        phone: msg.phone,
        flats,
        preferredLocations,
        requirements: msg.requirements,
        createdAt: msg.createdAt,
      };
    });

    res.status(200).json(formattedMessages);
  } catch (error) {
    console.error('Error in getContactMessages:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};