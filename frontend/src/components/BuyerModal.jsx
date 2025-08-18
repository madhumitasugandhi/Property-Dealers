import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';

// Styled Components
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
  font-size: 1rem;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  resize: vertical;
  font-size: 1rem;
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

const OthersInput = styled.input`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: white;
  outline: none;
  width: 150px;
  font-size: 1rem;
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
`;

const RadioRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
`;

const StyledRadio = styled.input.attrs({ type: 'radio' })`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: white;
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BuyerModal = ({ isOpen, onClose, property }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    title: '',
    type: '',
    location: '',
    taluka: '', // Added for taluka
  });

  useEffect(() => {
    if (property) {
      console.log("BuyerModal Property:", property);
      console.log("BuyerModal FormData:", formData);
      setFormData((prev) => ({
        ...prev,
        title: property.title || '',
        type: property.type || '',
        location: property.location || '',
        taluka: property.taluka || '', // Added for taluka
      }));
    }
  }, [property]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'radio' && name === 'leadLabel') {
      setFormData((prev) => ({
        ...prev,
        leadLabel: value,
        othersInput: value !== 'Others' ? '' : prev.othersInput,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const payload = {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        title: formData.title,
        property_type: formData.type,
        location: formData.location,
        taluka: formData.taluka || null, // Added for taluka
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
        <h3>Enquire Now</h3>
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
            name="taluka"
            placeholder="Taluka"
            value={formData.taluka}
            readOnly
          />
           <Input
            type="text"
            name="title"
            placeholder="Property Name"
            value={formData.title}
            readOnly
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
          
          <SubmitButton type="submit">Submit</SubmitButton>
        </Form>
      </Modal>
    </ModalOverlay>
  );
};

export default BuyerModal;