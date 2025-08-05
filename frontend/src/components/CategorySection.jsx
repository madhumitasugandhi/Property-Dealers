import React from "react";
import styled from "styled-components";
import CategoryCard from "./CategoryCard";
import flat from "../assets/flat.jpg";
import farm from "../assets/farm.jpg";
import shop from "../assets/shop.jpg";
import Land from "../assets/Land.jpg";
import { motion } from "framer-motion";



// New ParentContainer to wrap the Section
const ParentContainer = styled.div`
  background-color: #E8E8E8;
  width: 100%;
  box-sizing: border-box;
`;

const CardWrapper = styled.div`
  max-width: 100%;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Default box shadow */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Added box-shadow transition */

  /* Lighter image by default */
  & > div { /* Targeting CategoryCard */
    img {
      filter: brightness(1); /* Normal brightness initially */
      transition: filter 0.3s ease, transform 0.3s ease; /* Transform transition for image */
      transform: scale(1); /* Default state */
    }
  }

  &:hover {
    transform: translateY(-5px); /* Slight lift effect on hover */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Enhanced box shadow on hover */
    
    /* Darken and zoom image on hover */
    & > div { /* Targeting CategoryCard */
      img {
        filter: brightness(0.8); /* Darken image on hover */
        transform: scale(1.1); /* Zoom only, no rotation */
      }
    }
  }

  @media (max-width: 480px) {
    transform: scale(0.95);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08); /* Lighter default shadow for mobile */
    
    &:hover {
      transform: scale(0.95) translateY(-5px); /* Maintain scale on mobile */
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* Lighter hover shadow for mobile */
    }
  }
`;


const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
  padding: 4rem 1rem;
  gap: 1.5rem;
  max-width: 1200px; /* Adjusted to constrain width */
  box-sizing: border-box;
  margin: 0 auto;
  overflow-x: hidden;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 2rem 0.75rem;
    gap: 1rem;
    max-width: 90%; /* Slightly narrower for tablets */
  }

  @media (max-width: 868px) {
    padding: 2rem 0.5rem;
    max-width: 95%; /* Adjust for smaller screens */
  }

  @media (max-width: 480px) {
    padding: 1.5rem 0.25rem;
    gap: 0.75rem;
    max-width: 100%; /* Full width for mobile */
  }
`;

const Left = styled(motion.div)`
  flex: 1;
  min-width: 280px;
  max-width: 100%;
  box-sizing: border-box;

  h1 {
    font-size: 2.5rem;
    line-height: 1.2;

    span {
      color: #000;
      position: relative;
    }

    @media (max-width: 868px) {
      font-size: 2rem;
    }

    @media (max-width: 480px) {
      font-size: 1.5rem;
    }
  }

  p {
    margin: 1rem 0;
    color: #555;
    font-size: 1rem;

    @media (max-width: 480px) {
      font-size: 0.9rem;
    }
  }

  hr {
    width: 180px;
    border: 2px solid #005ca8;
    margin-bottom: 1rem;

    @media (max-width: 480px) {
      width: 120px;
    }
  }
`;

const Grid = styled(motion.div)`
  flex: 2;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  max-width: 100%;
  box-sizing: border-box;

  @media (max-width: 868px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const TallCard = styled.div`
  grid-row: span 2;
  height: 100%; /* Ensure it takes full height of two rows */
  display: flex;
  flex-direction: column;

  & > ${CardWrapper} {
    height: 100%;
    & > div { /* Targeting CategoryCard */
      height: 100%;
      img {
        height: 100%;
        object-fit: cover; /* Ensure image covers the area */
        width: 100%;
      }
    }
  }

  @media (max-width: 868px) {
    grid-row: auto;
    height: auto;
    & > ${CardWrapper} > div {
      height: auto;
      img {
        height: auto;
        object-fit: contain; /* Adjust for mobile */
      }
    }
  }
`;
const CategorySection = () => {
  return (
    <>
      <style>
        {`
          @media (max-width: 868px) {
            .browse-wrapper {
              font-size: 1.8rem !important;
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

          @media (max-width: 480px) {
            .browse-wrapper {
              font-size: 1.5rem !important;
            }

            .browse-big-box {
              width: 40px !important;
              height: 40px !important;
              top: -10px !important;
              left: -10px !important;
            }

            .browse-small-box {
              width: 20px !important;
              height: 20px !important;
              top: -24px !important;
              left: 20px !important;
            }
          }
        `}
      </style>


      <ParentContainer>
        <Section>
          <Left
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h1>
            <span
  className="browse-wrapper"
  style={{
    position: "relative",
    display: "inline-block",
    marginRight: "8px",
  }}
>
  <span
    className="browse-big-box"
    style={{
      position: "absolute",
      top: "-10px",
      left: "-10px",
      width: "60px",
      height: "60px",
      backgroundColor: "#007bff",
      borderRadius: "6px",
      zIndex: 0,
    }}
  ></span>
  <span
    className="browse-small-box"
    style={{
      position: "absolute",
      top: "-27px",
      left: "35px",
      width: "30px",
      height: "30px",
      backgroundColor: "#007bff",
      border: "2px solid white",
      borderRadius: "6px",
      zIndex: 1,
    }}
  ></span>
  <span
    style={{
      position: "relative",
      zIndex: 2,
      color: "#000",
      fontWeight: "600",
    }}
  >
    Browse
  </span>
</span>

              Listings By <br /> Categories
            </h1>
            <p>Curated by expert real estate agents!</p>
            <motion.div
              className="underline-bar"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.5 }}
              style={{
                width: "clamp(150px, 40vw, 220px)",
                height: "4px",
                backgroundColor: "#005ca8",
                margin: "1rem auto 0",
                borderRadius: "2px",
              }}
            />
            <br />
            <CardWrapper>
              <CategoryCard title="Flat" count="175" image={flat} />
            </CardWrapper>
          </Left>

          <Grid
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <CardWrapper>
              <CategoryCard title="Farm" count="7" image={farm} />
            </CardWrapper>
            <CardWrapper>
              <CategoryCard title="Shops" count="4" image={shop} />
            </CardWrapper>
            <TallCard>
              <CardWrapper>
                <CategoryCard title="Land" count="7" image={Land} />
              </CardWrapper>
            </TallCard>
          </Grid>
        </Section>
      </ParentContainer>
    </>
  );
};

export default CategorySection;