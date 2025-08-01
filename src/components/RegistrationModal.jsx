import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ModalWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  margin: auto;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  font-size: 1rem;
  &:focus {
    border-color: #0984e3;
    box-shadow: 0 0 0 2px rgba(9, 132, 227, 0.2);
  }
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
`;

const RadioGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 12px;
  background: ${({ disabled }) => (disabled ? '#b2bec3' : '#0984e3')};
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background 0.3s;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.8rem;
  margin: 0;
`;

const RegistrationModal = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('');
  const [userType, setUserType] = useState('');
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isFormValid = name && phone.length === 10 && district && userType && terms;

  const handleSubmit = () => {
    if (!isFormValid) {
      setError('Please fill all required fields correctly.');
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  };

  return (
    <ModalWrapper as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          style={{ textAlign: 'center' }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1.2 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#00b894',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              fontSize: '2rem',
              color: '#fff',
            }}
          >
            ✓
          </motion.div>
          <h3>Account Created Successfully!</h3>
        </motion.div>
      ) : (
        <>
          <Label>Full Name</Label>
          <Input
            type="text"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Label>Phone Number</Label>
          <Input
            type="tel"
            placeholder="Enter 10-digit number"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
          />

          <Label>District</Label>
          <Input
            type="text"
            placeholder="Enter district"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />

          <Label>You Are</Label>
          <RadioGroup>
            {['Buyer', 'Seller', 'Broker'].map((type) => (
              <label key={type}>
                <input
                  type="radio"
                  value={type}
                  checked={userType === type}
                  onChange={(e) => setUserType(e.target.value)}
                />{' '}
                {type}
              </label>
            ))}
          </RadioGroup>

          <label>
            <input
              type="checkbox"
              checked={terms}
              onChange={() => setTerms(!terms)}
              style={{ marginRight: '8px' }}
            />
            I agree to the terms and conditions
          </label>

          {error && <ErrorText>{error}</ErrorText>}

          <Button disabled={!isFormValid || loading} onClick={handleSubmit}>
            {loading ? 'Creating...' : 'Create Account'}
          </Button>
        </>
      )}
    </ModalWrapper>
  );
};

export default RegistrationModal;
