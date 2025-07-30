import React from "react";
import styled from "styled-components";
import CategoryCard from "./CategoryCard";
import flat from "../assets/flat.jpg";
import farm from "../assets/farm.jpg";
import shop from "../assets/shop.jpg";

const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
  padding: 4rem 2rem;
  gap: 2rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 2rem 1rem;
  }
`;

const Left = styled.div`
  flex: 1;
  min-width: 320px;

  h1 {
    font-size: 2.5rem;
    line-height: 1.2;

    span {
      color: #c48d00;
      position: relative;
    }
  }

  p {
    margin: 1rem 0;
    color: #555;
  }

  hr {
    width: 60px;
    border: 2px solid #c48d00;
    margin-bottom: 1rem;
  }
`;

const Grid = styled.div`
  flex: 2;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TallCard = styled.div`
  grid-row: span 2;
`;

const CategorySection = () => {
  return (
    <Section>
      <Left>
        <h1>
          <span>Browse</span> Listings By <br /> Categories
        </h1>
        <p>Curated by expert real estate agents!</p>
        <hr />
        <CategoryCard title="Flat" count="175" image={flat} />
      </Left>
      <Grid>
        <CategoryCard title="Farm" count="7" image={farm} />
        <CategoryCard title="Shops" count="4" image={shop} />
        <CategoryCard title="Farm" count="7" image={farm} />
      </Grid>
    </Section>
  );
};

export default CategorySection;
