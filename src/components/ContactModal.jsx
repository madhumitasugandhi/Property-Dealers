import React from 'react';
import styled from 'styled-components';
import { FiX } from 'react-icons/fi';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  position: relative;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  color: #005ca8;
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  background-color: #005ca8;
  color: white;
  padding: 0.9rem;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #005ca8;
  }
`;

const CloseIcon = styled(FiX)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  cursor: pointer;

  
  &:hover {
    background-color: #005ca8;
    color:#fff;
    padding:2px;
    border-radius:2px;
  }
`;

const ContactModal = ({ onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Submitted!');
    onClose();
  };

  return (
    <Overlay>
      <Modal>
        <CloseIcon onClick={onClose} />
        <Title>Book Your Free Site Visit Now!</Title>
        <StyledForm onSubmit={handleSubmit}>
          <Input type="text" placeholder="Name" required />
          <Input type="tel" placeholder="Phone Number" required />
          <Input type="email" placeholder="Enter your email address" required />
          <TextArea rows="3" placeholder="Requirement" />
          <SubmitButton type="submit">SUBMIT</SubmitButton>
        </StyledForm>
      </Modal>
    </Overlay>
  );
};

export default ContactModal;
