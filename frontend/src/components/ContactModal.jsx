// ContactModal.jsx
import React, { useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { FiX } from 'react-icons/fi';

// Prevent background scroll when modal is open
const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  overflow-y: auto;
`;

const Modal = styled.div`
  background: white;
  padding: 1.5rem 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;
  text-align: center;
  max-height: 90vh;
  overflow-y: auto;

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const Title = styled.h2`
  color: #005ca8;
  font-size: clamp(1.5rem, 6vw, 2rem);
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
  width: 100%;
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  width: 100%;
  resize: none;
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
    background-color: #004b8c;
  }

  @media (max-width: 480px) {
    padding: 0.6rem;
    width: 100%;
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
    color: #fff;
    padding: 2px;
    border-radius: 2px;
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const ContactModal = ({ onClose }) => {
  // Re-enable scroll when modal closes
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Submitted!');
    onClose();
  };

  return (
    <>
      <GlobalStyle />
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
    </>
  );
};

export default ContactModal;
