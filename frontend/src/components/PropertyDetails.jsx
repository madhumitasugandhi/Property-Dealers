import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import HomeCard from "./HomeCard";
import BuyerModal from "./BuyerModal";

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
        setLoading(true);
        let propertyData = null;
        let source = null;

        // Try fetching from admin properties first
        try {
          console.log(`Fetching admin property with ID: ${id}`);
          const adminResponse = await axios.get(`http://localhost:5000/api/property/${id}`);
          console.log("Admin Property Response:", adminResponse.data);
          propertyData = adminResponse.data;
          source = "admin";
        } catch (adminError) {
          console.log(`Admin property not found for ID ${id}:`, adminError.message);
          // Try seller property
          try {
            console.log(`Fetching seller property with ID: ${id}`);
            const sellerResponse = await axios.get(`http://localhost:5000/api/seller/${id}`);
            console.log("Seller Property Response:", sellerResponse.data);
            propertyData = sellerResponse.data;
            source = "seller";
          } catch (sellerError) {
            console.error(`Seller property not found for ID ${id}:`, sellerError.message);
            throw new Error(`Property not found for ID ${id} in either admin or seller data.`);
          }
        }

        if (!propertyData) {
          throw new Error("Property data is empty.");
        }

        // Normalize property data
        const normalizedProperty = {
          id: propertyData.id,
          images: propertyData.images && Array.isArray(propertyData.images) && propertyData.images.length > 0 ? propertyData.images[0] : null,
          title: propertyData.title || (source === "seller" ? propertyData.name : "Untitled"),
          location: propertyData.location || "Unknown Location",
          taluka: propertyData.taluka || "N/A",
          bhk: propertyData.bhk || null,
          area: propertyData.area || null,
          floor: propertyData.floor || null,
          totalPrice: propertyData.totalPrice || null,
          propertyType: (source === "admin" ? propertyData.propertyType : propertyData.propertyType) || "Unknown",
          description: propertyData.description || "N/A",
          source,
        };

        console.log("Normalized Property:", normalizedProperty);
        setProperty(normalizedProperty);

        // Fetch related properties
        const adminPropertiesResponse = await axios.get("http://localhost:5000/api/property");
        const sellerPropertiesResponse = await axios.get("http://localhost:5000/api/seller/accepted");

        const adminProperties = Array.isArray(adminPropertiesResponse.data) ? adminPropertiesResponse.data : [];
        const sellerProperties = Array.isArray(sellerPropertiesResponse.data) ? sellerPropertiesResponse.data : [];

        console.log("Admin Properties:", adminProperties);
        console.log("Seller Properties:", sellerProperties);

        // Normalize admin properties
        const normalizedAdmin = adminProperties.map(prop => ({
          id: prop.id,
          images: prop.images && Array.isArray(prop.images) && prop.images.length > 0 ? prop.images[0] : null,
          title: prop.title || "Untitled",
          location: prop.location || "Unknown Location",
          bhk: prop.bhk || null,
          area: prop.area || null,
          floor: prop.floor || null,
          propertyType: prop.propertyType || "Unknown",
          taluka: prop.taluka || "N/A",
          totalPrice: prop.totalPrice || null,
        }));

        // Normalize seller properties
        const normalizedSeller = sellerProperties.map(prop => ({
          id: prop.id,
          images: prop.images && Array.isArray(prop.images) && prop.images.length > 0 ? prop.images[0] : null,
          title: prop.title || prop.name || "Untitled",
          location: prop.location || "Unknown Location",
          bhk: prop.bhk || null,
          area: prop.area || null,
          floor: prop.floor || null,
          propertyType: prop.propertyType || "Unknown",
          taluka: prop.taluka || "N/A",
          totalPrice: prop.totalPrice || null,
        }));

        // Merge and filter related properties
        const allProperties = [...normalizedAdmin, ...normalizedSeller];
        console.log("All Properties:", allProperties);

        const relatedProperties = allProperties.filter(
          (p) => 
            p.propertyType && 
            normalizedProperty.propertyType && 
            p.propertyType.toLowerCase() === normalizedProperty.propertyType.toLowerCase() && 
            p.id !== parseInt(id)
        );
        console.log("Related Properties:", relatedProperties);

        setRelated(relatedProperties);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError(`Failed to load property details for ID ${id}. Please try again later.`);
        toast.error(`Failed to load property details for ID ${id}. Please try again later.`);
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
      <Image 
        src={property.images ? `http://localhost:5000${property.images}` : "https://placehold.co/360x200?text=No+Image"} 
        alt={property.title || "Property"} 
        onError={(e) => {
          console.error(`Failed to load image: http://localhost:5000${property.images}`);
          e.target.src = "https://placehold.co/360x200?text=No+Image";
        }}
      />
      <Info>
        <Title>{property.title}</Title>
        <Text><strong>Location:</strong> {property.location}</Text>
        <Text><strong>Taluka:</strong> {property.taluka}</Text>
        {property.propertyType === "flat" && property.bhk && (
          <Text><strong>Bedrooms:</strong> {property.bhk}</Text>
        )}
        {property.propertyType === "shop" && property.floor && (
          <Text><strong>Floor:</strong> {property.floor}</Text>
        )}
        <Text><strong>Area:</strong> {property.area ? `${property.area} sqft` : "N/A"}</Text>
        <Text><strong>Price:</strong> ₹{property.totalPrice ? property.totalPrice.toLocaleString("en-IN") : "N/A"}</Text>
        <Text><strong>Type:</strong> {property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1)}</Text>
        <Text><strong>Description:</strong> {property.description}</Text>
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
                images={p.images}
                title={p.title}
                location={p.location}
                bhk={p.bhk}
                area={p.area}
                floor={p.floor}
                propertyType={p.propertyType}
                taluka={p.taluka}
                price={p.totalPrice}
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
          propertyType: property.propertyType,
          location: property.location,
          bhk: property.bhk,
          area: property.area,
          floor: property.floor,
          totalPrice: property.totalPrice,
          description: property.description,
          taluka: property.taluka,
        }}
      />
    </Container>
  );
};

export default PropertyDetails;