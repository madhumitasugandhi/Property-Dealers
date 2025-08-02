import React from 'react';
import styled from 'styled-components';
import bannerImg from '../assets/farm.jpg';
import { motion } from 'framer-motion';

// 🔹 Banner Section Styles
const PageBanner = styled.section`
  background: url(${bannerImg}) center/cover no-repeat;
  height: 280px;
  padding: 6rem 2rem 4rem;
  text-align: center;
  color: #fff;
  position: relative;

  h1 {
    font-size: clamp(2rem, 6vw, 3.5rem);
    font-weight: 700;
    margin-bottom: 1rem;
    z-index: 2;
    position: relative;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    z-index: 1;
  }

  * {
    position: relative;
    z-index: 2;
  }
`;

const AnimatedLine = styled(motion.div)`
  height: 4px;
  background-color: #fff;
  margin: 0 auto 10px;
  width: clamp(40px, 10vw, 80px);
`;

const BannerSubtitle = styled.p`
  font-size: 1.1rem;
  color: #f1f5f9;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// 🔹 Service Section Styles
const Container = styled.div`
  max-width: 1200px;
  margin: 60px auto;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  color: #003366;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #475569;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 50px auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
`;

const Card = styled(motion.div)`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 28px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-6px);
  }
`;

const ServiceTitle = styled.h3`
  color: #1e293b;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 14px;
`;

const Description = styled.p`
  color: #4b5563;
  font-size: 0.98rem;
  line-height: 1.6;
`;


// 🔹 Main Component
const Services = () => {
  const servicesList = [
    {
      title: "1. Property Buying & Selling",
      desc: `We offer curated property listings with detailed insights, virtual tours, and personalized recommendations to help clients make informed decisions.`,
    },
    {
      title: "2. Verified Legal Assistance",
      desc: `Our in-house legal partners handle documentation, title checks, and property registration, ensuring complete peace of mind.`,
    },
    {
      title: "3. Financial Planning & Loan Help",
      desc: `Get assistance with home loans, eligibility checks, paperwork, and the best financing options — all under one roof.`,
    },
    {
      title: "4. Property Management Services",
      desc: `We manage tenant screening, rent collection, and maintenance for a smooth, profitable rental experience.`,
    },
    {
      title: "5. Interior Design & Customization",
      desc: `Work with top designers to turn your space into a stylish, functional dream home that reflects your taste.`,
    },
    {
      title: "6. Renovation & Construction",
      desc: `From renovations to full builds, we deliver quality construction with transparency, accountability, and on-time delivery.`,
    },
  ];

  return (
    <>
      <PageBanner>
        <h1>Our Services</h1>
        <AnimatedLine
          initial={{ width: 0 }}
          animate={{ width: "150px" }}
          transition={{ duration: 1 }}
        />
        <BannerSubtitle>
          Your one-stop destination for every property need  from buying to interiors, and beyond.
        </BannerSubtitle>
      </PageBanner>

      <Container>
        <>
  {/* 2-Box Styling for Heading */}
  <style>
    {`
      @media (max-width: 768px) {
        .builder-wrapper {
          font-size: 2rem !important;
        }
        .big-box {
          width: 50px !important;
          height: 50px !important;
          top: -12px !important;
          left: -12px !important;
        }
        .small-box {
          width: 25px !important;
          height: 25px !important;
          top: -28px !important;
          left: 24px !important;
        }
        .underline-bar {
          margin-top: 0.8rem !important;
        }
      }
    `}
  </style>

  <div style={{ textAlign: "center", marginTop: "60px", marginBottom: "20px" }}>
    <h2
      className="builder-wrapper"
      style={{
        fontSize: "2.5rem",
        fontWeight: "800",
        color: "#1f2937",
        position: "relative",
        display: "inline-block",
        lineHeight: "1.2",
      }}
    >
      <span
        style={{
          position: "relative",
          display: "inline-block",
          marginRight: "8px",
        }}
      >
        <span
          className="big-box"
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
          className="small-box"
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
        What
      </span>
      We Offer
    </h2>
  </div>
</>

        <Subtitle>
          We provide a full spectrum of real estate services designed to make your property journey smoother — whether you're buying, selling, investing, or building.
        </Subtitle>

        <Grid>
          {servicesList.map((service, i) => (
            <Card
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <ServiceTitle>{service.title}</ServiceTitle>
              <Description>{service.desc}</Description>
            </Card>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Services;
