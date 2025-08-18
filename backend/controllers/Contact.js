import Contact from "../models/Contact.js";

export const createContact = async (req, res) => {
  try {
    const { name, phone, message, status, followupdate } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: 'Name and phone are required' });
    }

    const contact = await Contact.create({
      name,
      phone,
      message,
      status: status || 'pending',
      followupdate,
    });

    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ message: 'Error submitting form', error: error.message });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Error fetching contacts', error: error.message });
  }
};

export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByPk(id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({ message: 'Error fetching contact', error: error.message });
  }
};

export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, message, status, followupdate } = req.body;
    const contact = await Contact.findByPk(id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    await contact.update({ name, phone, message, status, followupdate });
    res.status(200).json({ message: 'Contact updated successfully' });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ message: 'Error updating contact', error: error.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByPk(id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    await contact.destroy();
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ message: 'Error deleting contact', error: error.message });
  }
};