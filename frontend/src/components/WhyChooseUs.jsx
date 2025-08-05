// src/components/WhyChooseUs.jsx

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import img1 from '../assets/bg1.jpg';
import img2 from '../assets/bg2.jpg';
import img3 from '../assets/bg3.jpeg';
import img4 from '../assets/bg4.jpg';

const images = [img1, img2, img3, img4];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Section = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 40px 10vw;
  align-items: flex-start;
  gap: 60px;
  flex-wrap: wrap;
  text-align: justify;
  box-sizing: border-box;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 40px 16px;
    gap: 40px;
  }
`;

const Left = styled(motion.div)`
  flex: 1.2;
  min-width: 300px;

  h2 {
    color: #005ca8;
    font-size: 32px;
    font-weight: 800;
    margin-bottom: 20px;
  }

  p {
    margin: 8px 0;
    font-size: 16px;
    line-height: 1.6;
    color: #444;
  }

  strong {
    font-weight: 700;
    color: #333;
  }

  button {
    margin-top: 20px;
    padding: 12px 24px;
    background-color: #005ca8;
    color: white;
    border: none;
    cursor: pointer;
    font-weight: 600;
    border-radius: 4px;
    letter-spacing: 1px;
  }
`;

const Right = styled(motion.div)`
  flex: 1;
  position: relative;
  min-width: 260px;

  .backdrop-box {
    position: absolute;
    top: -10%;
    left: 5%;
    width: 100%;
    padding-top: 66%;
    background-color: #005ca8;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    border-radius: 12px;
    z-index: 0;

    @media (max-width: 768px) {
      display: none;
    }
  }

  .image-wrapper {
    position: relative;
    width: 100%;
    padding-top: 66%;
    border-radius: 12px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    overflow: hidden;
    z-index: 1;
  }

  img {
    position: absolute;
    top: 0; 
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 1s ease-in-out;
    border-radius: 12px;
  }
`;

const Section1 = styled.section`
  padding: 40px 10vw;
  background-color: #E8E8E8;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 40px 16px;
  }
`;

const Content = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const LeftSection = styled(motion.div)`
  flex: 1;
  min-width: 280px;

  p {
    font-size: 30px;
    line-height: 1.6;
    color: #444;
  }
`;

const RightSection = styled.div`
  flex: 2;
  min-width: 300px;
`;

const AmenitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 32px;
  margin-top: 20px;
`;

const AmenityCard = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 50px;
    height: 50px;
    object-fit: contain;
    background: #005ca8;
    padding: 10px;
    border-radius: 10px;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }

  .text {
    h4 {
      margin: 0;
      font-size: 18px;
      font-weight: 700;
      color: #333;
    }

    p {
      margin: 4px 0 0;
      font-size: 14px;
      color: #555;
    }
  }
`;

const WhyChooseUs = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Section>
        <Left variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2>WHY CHOOSE US?</h2>
          <p><strong>SDPL Aashray</strong> is an <strong>Affordable Homes Project</strong> within the Nagpur City limits in 5 different locations. <strong>Dabha, Beltarodi, Wanjara, Hazaripahad & Godhani</strong>.</p>
          <p>An Affordable venture of Sandeep Dwellers Pvt. Ltd. of 1 & 2 BHK Flats, with Modern Facilities like Club House, Community Hall, Indoor Games, Guest Rooms, CCTV Surveillance, Security, Garden, Children Play Area, 24×7 Water Supply, Common Area with Power Backup & Automatic Lifts.</p>
          <p><strong>SDPL Aashray is Awarded the Best Residential Project</strong> in the category of Affordable Housing by the Times Property Real Estate Awards 2022</p>
          <button>KNOW MORE</button>
        </Left>
        <Right variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="backdrop-box"></div>
          <div className="image-wrapper">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`slide-${i}`}
                style={{ opacity: currentImage === i ? 1 : 0 }}
              />
            ))}
          </div>
        </Right>
      </Section>

      <Section1>
        <Content>
          <LeftSection variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p>We Provide <br /><strong>MODERN AMENITIES</strong><br />at <strong>AFFORDABILITY</strong></p>
          </LeftSection>

          <RightSection>
            <AmenitiesGrid>
              {[{
                icon: '/assets/quality.svg',
                title: 'Construction Quality',
                desc: 'Uncompromising quality, built right into every detail.',
              }, {
                icon: '/assets/play.svg',
                title: 'Children Play Area',
                desc: 'A lively play area with swings, slides, and adventures.',
              }, {
                icon: '/assets/water.svg',
                title: '24x7 Water Supply',
                desc: 'Water at your service around the clock.',
              }, {
                icon: '/assets/club.svg',
                title: 'Club House',
                desc: 'Indoor play & community hall for elevated lifestyle.',
              }, {
                icon: '/assets/lift.svg',
                title: 'Automatic Lift',
                desc: 'Enhancing your convenience.',
              }, {
                icon: '/assets/generator.svg',
                title: 'Generator Backup',
                desc: 'Back up Generator for Lift, Pump & Lights.',
              }].map((item, idx) => (
                <AmenityCard
                  key={idx}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <img src={item.icon} alt={item.title} />
                  <div className="text">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </AmenityCard>
              ))}
            </AmenitiesGrid>
          </RightSection>
        </Content>
      </Section1>
    </>
  );
};

export default WhyChooseUs;
