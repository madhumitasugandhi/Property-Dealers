import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HomeCard from './HomeCard';
import BuyerModal from './BuyerModal';

// Styled Components (unchanged)
const Container = styled.div`
  max-width: 900px;
  margin: 120px auto 40px auto;
  padding: 20px;
`;

const PageTitle = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.5rem;
  color: #1f2937;
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

const Section = styled.div`
  margin-top: 40px;
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
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
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
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  cursor: pointer;
`;

const AgentBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: #f4f4f4;
  padding: 1rem;
  border-radius: 10px;
`;

const BuyNowButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  &:hover {
    background-color: #218838;
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
`;

const PropertyDetails = ({ properties }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showBuyerModal, setShowBuyerModal] = useState(false);

  const property = properties.find((p) => p.id === parseInt(id));
  const related = properties.filter(
    (p) => p.category === property?.category && p.id !== property.id
  );

  if (!property) return <Container>Property not found.</Container>;

  return (
    <Container>
      <PageTitle>Property Details</PageTitle>
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
      <Image src={property.image} alt={property.title} />
      <Info>
        <Title>{property.title}</Title>
        <Text><strong>Location:</strong> {property.location}</Text>
        <Text><strong>Bedrooms:</strong> {property.bedrooms}</Text>
        <Text><strong>Bathrooms:</strong> {property.bathrooms}</Text>
        <Text><strong>Area:</strong> {property.area} sqft</Text>
        <Text><strong>Agent:</strong> {property.agentName}</Text>
        <Text><strong>Price:</strong> ₹{property.price.toLocaleString()}</Text>
      </Info>

      <Section>
        <h3>Description</h3>
        <p>Spacious property located in prime location. Ideal for families and investors.</p>
        <ul>
          <li>✅ Modular Kitchen</li>
          <li>✅ Nearby Schools</li>
          <li>✅ Parking & Lift Available</li>
        </ul>
      </Section>

      <Section>
        <BuyNowButton onClick={() => setShowBuyerModal(true)}>
          Buy Now
        </BuyNowButton>
      </Section>

      <Section>
        <h3>Agent Info</h3>
        <AgentBox>
          <img
            src={property.agentImage || "https://via.placeholder.com/60"}
            alt={property.agentName}
            style={{ width: "60px", height: "60px", borderRadius: "50%" }}
          />
          <div>
            <strong>{property.agentName}</strong>
            <div style={{ marginTop: "6px" }}>
              <button
                style={{
                  backgroundColor: "#005ca8",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => setShowModal(true)}
              >
                Contact Agent
              </button>
            </div>
          </div>
        </AgentBox>
      </Section>

      <Section>
        <h3>Schedule a Visit</h3>
        <Form onSubmit={(e) => {
          e.preventDefault();
          alert("Visit scheduled!");
        }}>
          <Input placeholder="Your Name" required />
          <Input placeholder="Phone Number" type="tel" required />
          <Textarea rows="4" placeholder="Message" />
          <SubmitButton>Submit</SubmitButton>
        </Form>
      </Section>

      {related.length > 0 && (
        <Section>
          <h3>You Might Also Like</h3>
          <CardGrid>
            {related.map((p) => (
              <HomeCard key={p.id} {...p} />
            ))}
          </CardGrid>
        </Section>
      )}

      {showModal && (
        <ModalOverlay>
          <Modal>
            <CloseBtn onClick={() => setShowModal(false)}>×</CloseBtn>
            <h3>Contact {property.agentName}</h3>
            <Form onSubmit={(e) => {
              e.preventDefault();
              alert("Message sent to agent!");
              setShowModal(false);
            }}>
              <Input type="text" placeholder="Your Name" required />
              <Input type="email" placeholder="Your Email" required />
              <Textarea placeholder={`Hi ${property.agentName}, I am interested in "${property.title}".`} required />
              <SubmitButton type="submit">Send Message</SubmitButton>
            </Form>
          </Modal>
        </ModalOverlay>
      )}

      {/* Buyer Modal with property data */}
      <BuyerModal
        isOpen={showBuyerModal}
        onClose={() => setShowBuyerModal(false)}
        property={{
          type: property.category,
          location: property.location,
          bhk: property.bedrooms,
          area: property.area,
          price: property.price,
        }}
      />
    </Container>
  );
};

export default PropertyDetails;