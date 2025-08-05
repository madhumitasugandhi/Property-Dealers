
import React from "react";
import styled, { keyframes } from "styled-components";

// Animation for modal
const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
`;

const ModalContent = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  min-width: 280px;
  color: #ffffff;
  animation: ${fadeIn} 0.3s ease-out;
  box-shadow: 0 12px 45px rgba(0, 0, 0, 0.4);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.8rem;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #ff6b6b;
  }
`;

const ChargesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 0.75rem;
  font-size: 1rem;
  color: #ffffffcc;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const TableCell = styled.td`
  padding: 0.75rem;
  font-size: 0.9rem;
  color: #ffffff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const BrokerChargesModal = ({ show, onClose }) => {
  // Sample broker charges data
  const charges = [
    { service: "Property Sale Commission", charge: "2% of sale price" },
    { service: "Property Rental Commission", charge: "1 month's rent" },
    { service: "Consultation Fee", charge: "₹5000 per hour" },
    { service: "Property Valuation", charge: "₹10,000 flat fee" },
    { service: "Legal Assistance", charge: "₹15,000 per case" },
  ];

  if (!show) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Broker Charges</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        <ChargesTable>
          <thead>
            <tr>
              <TableHeader>Service</TableHeader>
              <TableHeader>Charge</TableHeader>
            </tr>
          </thead>
          <tbody>
            {charges.map((item, index) => (
              <tr key={index}>
                <TableCell>{item.service}</TableCell>
                <TableCell>{item.charge}</TableCell>
              </tr>
            ))}
          </tbody>
        </ChargesTable>
      </ModalContent>
    </ModalOverlay>
  );
};

export default BrokerChargesModal;
