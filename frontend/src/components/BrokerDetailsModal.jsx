import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ModalOverlay = styled.div`
  display: ${({ show }) => (show ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalContent = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: ${slideIn} 0.3s ease-out;
  position: relative;
  color: #fff;

  @media (max-width: 480px) {
    padding: 1.5rem;
    width: 95%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #fff;
  transition: color 0.3s ease;

  &:hover {
    color: #005ca8;
  }
`;

const ModalTitle = styled.h2`
  margin: 0 0 1.5rem;
  font-size: 1.8rem;
  text-align: center;
  color: #fff;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid ${({ error }) => (error ? "#ff4d4d" : "rgba(255, 255, 255, 0.3)")};
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${({ error }) => (error ? "#ff4d4d" : "#005ca8")};
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid ${({ error }) => (error ? "#ff4d4d" : "rgba(255, 255, 255, 0.3)")};
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;
  resize: vertical;
  min-height: 100px;

  &:focus {
    border-color: ${({ error }) => (error ? "#ff4d4d" : "#005ca8")};
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const ErrorMessage = styled.span`
  color: #ff4d4d;
  font-size: 0.85rem;
  margin-top: -0.5rem;
`;

const SuccessMessage = styled.div`
  color: #00cc00;
  font-size: 1rem;
  text-align: center;
  margin-top: 1rem;
  animation: ${fadeIn} 0.3s ease-out;
`;

const SubmitButton = styled.button`
  padding: 0.8rem;
  background: #005ca8;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #003e73;
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
`;

const BrokerDetailsModal = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim() ? "" : "Name is required";
      case "email": {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) return "Email is required";
        if (!emailRegex.test(value)) return "Invalid email format";
        return "";
      }
      case "phone": {
        const phoneRegex = /^\d{10}$/;
        if (!value.trim()) return "Phone number is required";
        if (!phoneRegex.test(value)) return "Phone number must be 10 digits";
        return "";
      }
      case "address":
        return value.trim() ? "" : "Address is required";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "phone") {
      // Allow only digits for phone number
      if (/^\d*$/.test(value)) {
        newValue = value;
      } else {
        return; // Ignore non-digit input
      }
    }

    setFormData({ ...formData, [name]: newValue });
    setErrors({ ...errors, [name]: validateField(name, newValue) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      phone: validateField("phone", formData.phone),
      address: validateField("address", formData.address),
    };
    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      console.log("Broker Details Submitted:", formData);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({ name: "", email: "", phone: "", address: "" });
        onClose();
      }, 1500); // Show success message for 1.5 seconds before closing
    }
  };

  // Check if form is valid for enabling submit button
  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.email.trim() &&
      formData.phone.trim() &&
      formData.address.trim() &&
      !errors.name &&
      !errors.email &&
      !errors.phone &&
      !errors.address
    );
  };

  return (
    <ModalOverlay show={show}>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <ModalTitle>Broker Login</ModalTitle>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          <Input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          <Input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            required
          />
          {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
          <TextArea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            error={errors.address}
            required
          />
          {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
          {showSuccess && <SuccessMessage>Form submitted successfully!</SuccessMessage>}
          <SubmitButton type="submit" disabled={!isFormValid()}>
            Submit
          </SubmitButton>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default BrokerDetailsModal;