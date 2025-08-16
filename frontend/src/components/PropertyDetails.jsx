import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import HomeCard from "./HomeCard";
import BuyerModal from "./BuyerModal";

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

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [related, setRelated] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showBuyerModal, setShowBuyerModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const propertyResponse = await axios.get(`http://localhost:5000/api/property/${id}`);
        console.log("Property Details:", propertyResponse.data);
        setProperty(propertyResponse.data);

        const allPropertiesResponse = await axios.get("http://localhost:5000/api/property");
        const relatedProperties = allPropertiesResponse.data.filter(
          (p) => p.type.toLowerCase() === propertyResponse.data.type.toLowerCase() && p.id !== parseInt(id)
        );
        setRelated(relatedProperties);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load property details. Please try again later.");
        toast.error("Failed to load property details. Please try again later.");
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container>{error}</Container>;
  if (!property) return <Container>Property not found.</Container>;

  return (
    <Container>
      <PageTitle>Property Details</PageTitle>
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
      <Image src={`http://localhost:5000${property.image_path}`} alt={property.title} />
      <Info>
        <Title>{property.title}</Title>
        <Text><strong>Location:</strong> {property.location}</Text>
        <Text><strong>Taluka:</strong> {property.taluka || "N/A"}</Text>
        {property.type === "flat" && property.bhk && (
          <Text><strong>Bedrooms:</strong> {property.bhk}</Text>
        )}
        {property.type === "shop" && property.floor && (
          <Text><strong>Floor:</strong> {property.floor}</Text>
        )}
        <Text><strong>Area:</strong> {property.area ? `${property.area} sqft` : "N/A"}</Text>
        <Text><strong>Price:</strong> ₹{property.price.toLocaleString("en-IN")}</Text>
        <Text><strong>Type:</strong> {property.type.charAt(0).toUpperCase() + property.type.slice(1)}</Text>
        <Text><strong>Description:</strong> {property.description || "N/A"}</Text>
        
      </Info>

      <Section>
        <BuyNowButton onClick={() => setShowBuyerModal(true)}>
          Enquire Now 
        </BuyNowButton>
      </Section>

      {related.length > 0 && (
        <Section>
          <h3>You Might Also Like</h3>
          <CardGrid>
            {related.map((p) => (
              <HomeCard
                key={p.id}
                id={p.id}
                image={`http://localhost:5000${p.image_path}`}
                title={p.title}
                location={p.location}
                bhk={p.bhk}
                area={p.area}
                floor={p.floor}
                type={p.type}
                price={p.price}
                isFavorited={false}
              />
            ))}
          </CardGrid>
        </Section>
      )}

      {showModal && (
        <ModalOverlay>
          <Modal>
            <CloseBtn onClick={() => setShowModal(false)}>×</CloseBtn>
            <Form onSubmit={(e) => {
              e.preventDefault();
              alert("Message sent to agent!");
              toast.success("Message sent to agent!");
              setShowModal(false);
            }}>
              <Input type="text" placeholder="Your Name" required />
              <Input type="email" placeholder="Your Email" required />
              <SubmitButton type="submit">Send Message</SubmitButton>
            </Form>
          </Modal>
        </ModalOverlay>
      )}

      <BuyerModal
        isOpen={showBuyerModal}
        onClose={() => setShowBuyerModal(false)}
        property={{
          title: property.title,
          type: property.type,
          location: property.location,
          bhk: property.bhk,
          area: property.area,
          floor: property.floor,
          price: property.price,
          description: property.description, // Added description
          taluka: property.taluka, // Added taluka
        }}
      />
    </Container>
  );
};

export default PropertyDetails;