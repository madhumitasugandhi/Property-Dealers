import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HomeCard from "../components/HomeCard"; // ✅ Path thik kar lena

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  padding: 2rem;
`;

const SoldProperties = () => {
  const [sold, setSold] = useState([]);

  useEffect(() => {
    // Dummy sold properties
    const dummyData = [
      {
        id: 1,
        image: "https://via.placeholder.com/400x300?text=Sold+Property",
        agentName: "Shikha",
        agentImage: "https://via.placeholder.com/40?text=S",
        title: "3 BHK Luxury Flat",
        location: "Mumbai",
        bedrooms: 3,
        bathrooms: 2,
        area: 1500,
        isFavorited: true,
        price: 7500000,
      },
      {
        id: 2,
        image: "https://via.placeholder.com/400x300?text=Sold+Property",
        agentName: "Ravi",
        agentImage: "https://via.placeholder.com/40?text=R",
        title: "Commercial Office Space",
        location: "Bangalore",
        bedrooms: 0,
        bathrooms: 2,
        area: 2000,
        isFavorited: false,
        price: 15000000,
      },
      {
        id: 3,
        image: "https://via.placeholder.com/400x300?text=Sold+Property",
        agentName: "Neha",
        agentImage: "https://via.placeholder.com/40?text=N",
        title: "Villa with Garden",
        location: "Pune",
        bedrooms: 4,
        bathrooms: 3,
        area: 3000,
        isFavorited: true,
        price: 20000000,
      },
    ];

    setSold(dummyData);
  }, []);

  return (
    <Wrapper>
      {sold.map((property) => (
        <HomeCard
          key={property.id}
          {...property}
          status="sold" // ✅ Yeh important hai
        />
      ))}
    </Wrapper>
  );
};

export default SoldProperties;
