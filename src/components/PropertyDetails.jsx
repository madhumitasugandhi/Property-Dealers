import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 900px;
  margin: 120px auto 40px auto; 
  padding: 20px;
  position: relative;
  z-index: 1;
`;


const BackButton = styled.button`
  background-color: #005ca8;
  color: white;
  border: none;
  padding: 10px 16px;
  font-weight: bold;
  border-radius: 6px;
  margin-bottom: 20px;
  cursor: pointer;
  z-index: 1;
  position: relative;
`;



const Image = styled.img`
  width: 100%;
  height: 420px;
  object-fit: cover;
  border-radius: 12px;
`;

const Info = styled.div`
  margin-top: 20px;
`;

const Title = styled.h2`
  margin-bottom: 10px;
`;

const Text = styled.p`
  margin: 6px 0;
`;

const PropertyDetails = ({ properties }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const property = properties.find((p) => p.id === parseInt(id));

  if (!property) {
    return <Container>Property not found.</Container>;
  }

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
      <Image src={property.image} alt={property.title} />
      <Info>
        <Title>{property.title}</Title>
        <Text><strong>Location:</strong> {property.location}</Text>
        <Text><strong>Bedrooms:</strong> {property.bedrooms}</Text>
        <Text><strong>Bathrooms:</strong> {property.bathrooms}</Text>
        <Text><strong>Area:</strong> {property.area} sqft</Text>
        <Text><strong>Agent:</strong> {property.agentName}</Text>
      </Info>
    </Container>
  );
};

export default PropertyDetails;
