import React, { useRef } from "react";
import styled from "styled-components";
import { FaBed, FaRulerCombined, FaMapMarkerAlt, FaHeart, FaRegHeart } from "react-icons/fa";
import { MdPhotoCamera, MdStairs } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";

const Container = styled.div`
  max-width: 1200px; /* Constrain grid width */
  margin: 0 auto; /* Center the grid */
  padding: 0 15px; /* Add side padding */
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 cards per row on large screens */
  gap: 8px; /* Tighter gap */
  padding: 10px 0; /* Minimal padding */

  @media (max-width: 992px) { /* Medium screens */
    grid-template-columns: repeat(2, 1fr); /* 2 cards per row */
    gap: 6px;
  }

  @media (max-width: 768px) { /* Small screens */
    grid-template-columns: 1fr; /* 1 card per row */
    gap: 6px;
    padding: 5px 0;
  }
`;

const Card = styled(motion.div)`
  background: #fffff0;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  width: 100%; /* Full grid cell */
  max-width: 360px; /* Max width */
  transition: 0.3s;
  margin: 0 auto; /* Center card */
  cursor: pointer;

  &:hover {
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
    transform: translateY(-4px);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
`;

const PropertyImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0);
  transition: background 0.3s ease;

  ${Card}:hover & {
    background: rgba(0, 0, 0, 0.15);
  }
`;

const Tag = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: #facc15;
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 5px;
  display: flex;
  align-items: center;
`;

const ForSaleTag = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #facc15;
  color: white;
  font-weight: bold;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 5px;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
`;

const Location = styled.div`
  font-size: 14px;
  color: #6b7280;
  display: flex;
  align-items: center;
  margin-bottom: 12px;

  svg {
    margin-right: 4px;
  }
`;

const InfoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  color: #374151;
  margin-bottom: 12px;
  justify-content: ${({ propertyType }) => (propertyType === "flat" || propertyType === "shop" ? "space-between" : "flex-start")};

  div {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  color: #005ca8;
  font-weight: 600;
  align-items: center;
`;

const FavoriteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
`;

const HomeCard = ({
  id,
  images,
  title,
  location,
  bhk,
  area,
  floor,
  propertyType,
  taluka,
  // isFavorited = false,
  price,
}) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/property/${id}`);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Fallback for type
  const displayType = propertyType && typeof propertyType === "string" 
    ? propertyType.charAt(0).toUpperCase() + propertyType.slice(1) 
    : "Unknown";

  return (
    <Card
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onClick={handleClick}
    >
      <ImageWrapper>
        <PropertyImage 
          src={images || "https://via.placeholder.com/360x200?text=No+Image"} 
          alt={title || "Property"} 
        />
        <Overlay />
        <Tag>
          <MdPhotoCamera style={{ marginRight: "4px" }} /> 1
        </Tag>
        <ForSaleTag>{displayType}</ForSaleTag>
      </ImageWrapper>

      <CardContent>
        <Title>{title || "Untitled Property"}</Title>
        <Location>
          <FaMapMarkerAlt /> {location || "Unknown Location"}
          {taluka || "Unknown taluka"}
        </Location>

        <InfoRow type={propertyType}>
          {propertyType === "flat" && bhk && bhk !== "" && (
            <div>
              <FaBed /> {bhk} 
            </div>
          )}
          {propertyType === "shop" && floor && floor !== "" && (
            <div>
              <MdStairs /> Floor {floor}
            </div>
          )}
          {(propertyType === "farm" || propertyType === "land" || area) && (
            <div>
              <FaRulerCombined /> {area ? `${area} sqft` : "N/A"}
            </div>
          )}
        </InfoRow>

        <PriceRow>
          <span>₹ {price ? price.toLocaleString("en-IN") : "N/A"}</span>
          {/* <FavoriteButton aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}>
            {isFavorited ? <FaHeart color="red" /> : <FaRegHeart />}
          </FavoriteButton> */}
        </PriceRow>
      </CardContent>
    </Card>
  );
};

export const HomeCardGrid = ({ properties }) => {
  return (
    <Container>
      <CardGrid>
        {properties && properties.length > 0 ? (
          properties.map((property) => (
            <HomeCard
              key={property.id}
              id={property.id}
              image={`http://localhost:5000${property.images}`}
              title={property.title}
              location={property.location}
              bhk={property.bhk}
              area={property.area}
              floor={property.floor}
              propertyType={property.propertyType}
              price={property.totalPrice}
              // isFavorited={property.isFavorited || false}
            />
          ))
        ) : (
          <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>
            No properties found
          </p>
        )}
      </CardGrid>
    </Container>
  );
};

export default HomeCard;