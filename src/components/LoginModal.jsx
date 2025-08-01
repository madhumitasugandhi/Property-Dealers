// src/components/LoginModal.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaEnvelope } from 'react-icons/fa';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const Modal = styled(motion.div)`
  width: 400px;
  background: #fff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const CloseButton = styled(FaTimes)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  color: #444;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #002b5c;
`;

const Subtitle = styled.p`
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #666;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 1rem;
`;

const Button = styled.button`
  width: 100%;
  margin-top: 1.5rem;
  padding: 0.8rem;
  background: #74b9ff;
  color: #fff;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  text-align: center;
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #ddd;
  }
  span {
    margin: 0 1rem;
    color: #888;
    font-size: 0.9rem;
  }
`;

const EmailBtn = styled.button`
  width: 100%;
  padding: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  font-size: 0.95rem;
  svg {
    margin-right: 8px;
  }
`;

const Terms = styled.p`
  font-size: 0.75rem;
  color: #666;
  margin-top: 1rem;
  text-align: center;
`;

const OTPInput = styled.input`
  width: 100%;
  margin-top: 1rem;
  padding: 0.8rem;
  font-size: 1rem;
  text-align: center;
  letter-spacing: 0.3rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const LoginModal = ({ showModal, setShowModal }) => {
  const [phone, setPhone] = useState('');
  const [showOTP, setShowOTP] = useState(false);

  const handleContinue = () => {
    if (phone.trim()) {
      setShowOTP(true);
    }
  };

  return (
    <AnimatePresence>
      {showModal && (
        <Overlay as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Modal
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CloseButton onClick={() => setShowModal(false)} />
            <Title>{showOTP ? 'Enter OTP' : 'Login / Register'}</Title>
            <Subtitle>{showOTP ? `OTP sent to +91 ${phone}` : 'Please enter your Phone Number'}</Subtitle>

            {!showOTP ? (
              <>
                <Input
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Button onClick={handleContinue}>Continue</Button>
              </>
            ) : (
              <>
                <OTPInput maxLength={6} placeholder="Enter 6-digit OTP" />
                <Button>Verify OTP</Button>
              </>
            )}

            <Terms>
              By clicking you agree to <a href="#">Terms and Conditions</a>
            </Terms>
          </Modal>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;

