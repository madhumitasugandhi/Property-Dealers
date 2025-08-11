import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';

// Styled Components (unchanged)
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 500px;
  width: 100%;
  position: relative;
  animation: scaleIn 0.3s ease-in-out;

  @keyframes scaleIn {
    from {
      transform: scale(0.8);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: ${props => props.readOnly ? '#e5e7eb' : 'white'};
`;

const Textarea = styled.textarea`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  resize: vertical;
`;

const SubmitButton = styled.button`
  background-color: #005ca8;
  color: white;
  border: none;
  padding: 10px 16px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
`;

const BuyerModal = ({ isOpen, onClose, property }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    type: '',
    location: '',
    bhk: '',
    floor: '',
    area: '',
    price: '',
  });

  // Autofill fields when property prop changes
  useEffect(() => {
    if (property) {
      console.log("BuyerModal Property:", property); // Debug property
      console.log("BuyerModal FormData:", formData); // Debug formData
      setFormData((prev) => ({
        ...prev,
        type: property.type || '',
        location: property.location || '',
        bhk: property.bhk || '',
        floor: property.floor || '',
        area: property.area ? `${property.area} sqft` : '',
        price: property.price ? `₹${property.price.toLocaleString()}` : '',
      }));
    }
  }, [property]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        property_type: formData.type,
        location: formData.location,
        bhk: formData.type === 'flat' ? formData.bhk : null,
        floor: formData.type === 'shop' ? formData.floor : null,
        area: formData.area.replace(' sqft', '') || null,
        price: parseFloat(formData.price.replace(/[₹,]/g, '')) || null,
      };
  
      await axios.post('http://localhost:5000/api/buyer', payload);
      toast.success('Form submitted successfully!');
      onClose();
    } catch (err) {
      console.error('Axios Error:', err.response?.data || err.message);
      toast.error('Failed to submit form');
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <Modal>
        <CloseBtn onClick={onClose}>×</CloseBtn>
        <h3>Buy Property</h3>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <Textarea
            name="address"
            placeholder="Your Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="type"
            placeholder="Property Type"
            value={formData.type}
            readOnly
          />
          <Input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            readOnly
          />
          {formData.type === 'flat' && formData.bhk && (
            <Input
              type="text"
              name="bhk"
              placeholder="BHK"
              value={formData.bhk}
              readOnly
            />
          )}
          {formData.type === 'shop' && formData.floor && (
            <Input
              type="text"
              name="floor"
              placeholder="Floor"
              value={`${formData.floor} floor`}
              readOnly
            />
          )}
          <Input
            type="text"
            name="area"
            placeholder="Area (sqft)"
            value={formData.area}
            readOnly
          />
          <Input
            type="text"
            name="price"
            placeholder="Price"
            value={formData.price}
            readOnly
          />
          <SubmitButton type="submit">Submit</SubmitButton>
        </Form>
      </Modal>
    </ModalOverlay>
  );
};

export default BuyerModal;