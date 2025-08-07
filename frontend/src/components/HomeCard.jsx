import React, { useRef } from "react";
import styled from "styled-components";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMapMarkerAlt,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { MdPhotoCamera } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion"; 

const Card = styled(motion.div)`
  background: #FFFFF0;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  max-width: 360px;
  transition: 0.3s;
  margin: 10px;
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

const AgentBadge = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 4px 8px;
  border-radius: 5px;
`;

const AgentImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 5px;
  border: 1px solid white;
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
  justify-content: space-between;
  font-size: 14px;
  color: #374151;
  margin-bottom: 12px;

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
  image,
  // agentName,
  // agentImage,
  title,
  location,
  bedrooms,
  // bathrooms,
  area,
  isFavorited = false,
  price, // ✅ Price added
}) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/property/${id}`);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <Card
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onClick={handleClick}
    >
      <ImageWrapper>
        <PropertyImage src={image} alt={title} />
        <Overlay />
        <Tag>
          <MdPhotoCamera style={{ marginRight: "4px" }} /> 1
        </Tag>
        <ForSaleTag>For Sale</ForSaleTag>
        {/* <AgentBadge>
          <AgentImage src={agentImage} alt={agentName} />
          <span style={{ color: "white", fontSize: "12px" }}>{agentName}</span>
        </AgentBadge> */}
      </ImageWrapper>

      <CardContent>
        <Title>{title}</Title>
        <Location>
          <FaMapMarkerAlt /> {location}
        </Location>

        <InfoRow>
          <div><FaBed /> {bedrooms}</div>
          <div><FaRulerCombined /> {area} sqft</div>
        </InfoRow>

        <PriceRow>
          <span>₹ {price ? price.toLocaleString("en-IN") : "N/A"}</span>
          <FavoriteButton>
            {isFavorited ? <FaHeart color="red" /> : <FaRegHeart />}
          </FavoriteButton>
        </PriceRow>
      </CardContent>
    </Card>
  );
};

export default HomeCard;
