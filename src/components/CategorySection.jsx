import React from "react";
import styled from "styled-components";
import CategoryCard from "./CategoryCard";
import flat from "../assets/flat.jpg";
import farm from "../assets/farm.jpg";
import shop from "../assets/shop.jpg";
import { motion } from "framer-motion";

const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
  padding: 4rem 2rem;
  padding-inline: 8vw; 
  gap: 2rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 2rem 1rem;
  }
`;

const Left = styled(motion.div)`
  flex: 1;
  min-width: 320px;

  h1 {
    font-size: 2.5rem;
    line-height: 1.2;

    span {
      color: #000;
      position: relative;
    }
  }

  p {
    margin: 1rem 0;
    color: #555;
  }

  hr {
    width: 180px;
    border: 2px solid #005ca8;
    margin-bottom: 1rem;
  }
`;

const Grid = styled(motion.div)`
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
    <>
      <style>
        {`
          @media (max-width: 768px) {
            .browse-wrapper {
              font-size: 2rem !important;
            }

            .browse-big-box {
              width: 50px !important;
              height: 50px !important;
              top: -12px !important;
              left: -12px !important;
            }

            .browse-small-box {
              width: 25px !important;
              height: 25px !important;
              top: -28px !important;
              left: 24px !important;
            }
          }
        `}
      </style>

      <Section>
        <Left
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1>
            <span
              style={{
                position: "relative",
                display: "inline-block",
                marginRight: "8px",
              }}
              className="browse-wrapper"
            >
              <span
                className="browse-big-box"
                style={{
                  position: "absolute",
                  top: "-15px",
                  left: "-15px",
                  width: "60px",
                  height: "60px",
                  backgroundColor: "#005ca8",
                  borderRadius: "6px",
                  zIndex: -2,
                }}
              ></span>
              <span
                className="browse-small-box"
                style={{
                  position: "absolute",
                  top: "-32px",
                  left: "30px",
                  width: "30px",
                  height: "30px",
                  backgroundColor: "#005ca8",
                  border: "2px solid white",
                  borderRadius: "6px",
                  zIndex: -1,
                }}
              ></span>
              Browse
            </span>{" "}
            Listings By <br /> Categories
          </h1>
          <p>Curated by expert real estate agents!</p>
          <hr />
          <CategoryCard title="Flat" count="175" image={flat} />
        </Left>

        <Grid
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <CategoryCard title="Farm" count="7" image={farm} />
          <CategoryCard title="Shops" count="4" image={shop} />
          <CategoryCard title="Farm" count="7" image={farm} />
        </Grid>
      </Section>
    </>
  );
};

export default CategorySection;
