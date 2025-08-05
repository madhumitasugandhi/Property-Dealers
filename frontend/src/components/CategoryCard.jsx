import React from "react";
import styled from "styled-components";

const Card = styled.div`
  position: relative;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  overflow: hidden;
  min-height: 280px;
  color: white;
  padding: 16px;
  display: flex;
  align-items: flex-end;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);

  h3 {
    margin: 0;
    font-size: 1.5rem;
  }
  span {
    font-size: 0.875rem;
  }
`;

const CategoryCard = ({ title, count, image }) => (
  <Card image={image}>
    <div>
      <h3>{title}</h3>
      <span>{count} Properties</span>
    </div>
  </Card>
);

export default CategoryCard;
