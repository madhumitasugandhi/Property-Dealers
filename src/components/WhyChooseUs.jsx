import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import img1 from '../assets/bg1.jpeg'
import img2 from '../assets/bg2.jpg'
import img3 from '../assets/bg3.jpeg'
import img4 from '../assets/bg4.jpeg'

const images = [img1, img2, img3,img4];

const Section = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 60px 80px;
  align-items: flex-start;
  gap: 40px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const Left = styled.div`
  flex: 1.2;
  min-width: 300px;

  h2 {
    color: #b50000;
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
    background-color: #b50000;
    color: white;
    border: none;
    cursor: pointer;
    font-weight: 600;
    border-radius: 4px;
    letter-spacing: 1px;
  }
`;

const Right = styled.div`
  flex: 1;
  position: relative;
  min-width: 300px;

  .image-wrapper {
    position: relative;
    width: 100%;
    padding-top: 66%;
    background-color: #b50000;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    overflow: hidden;
  }

  img {
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 1s ease-in-out;
    border-radius: 12px;
  }
`;



const Section1 = styled.section`
  padding: 60px 40px;
  background-color: #fff;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }

  
`;

const Content = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  ;
`;

const LeftSection = styled.div`
  flex: 1;
  min-width: 280px;

  p{
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

const AmenityCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;

  img {
    width: 50px;
    height: 50px;
    object-fit: contain;
    background: #b50000;
    padding: 10px;
    border-radius: 10px;
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
    }, 4000); // 4 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Section>
        <Left>
          <h2>WHY CHOOSE US?</h2>
          <p><strong>SDPL Aashray</strong> is an <strong>Affordable Homes Project</strong> within the Nagpur City limits in 5 different locations. <strong>Dabha, Beltarodi, Wanjara, Hazaripahad & Godhani</strong>.</p>
          <p>An Affordable venture of Sandeep Dwellers Pvt. Ltd. of 1 & 2 BHK Flats, with Modern Facilities like Club House, Community Hall, Indoor Games, Guest Rooms, CCTV Surveillance, Security, Garden, Children Play Area, 24×7 Water Supply, Common Area with Power Backup & Automatic Lifts.</p>
          <p><strong>SDPL Aashray is Awarded the Best Residential Project</strong> in the category of Affordable Housing by the Times Property Real Estate Awards 2022</p>
          <button>KNOW MORE</button>
        </Left>
        <Right>
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
        <LeftSection>
          <p>We Provide <br></br><strong>MODERN AMENETIES</strong><br></br>at <strong>AFFORDABILITY</strong></p>
        </LeftSection>

        <RightSection>
          <AmenitiesGrid>
            <AmenityCard>
              <img src="/assets/quality.svg" alt="Construction Quality" />
              <div className="text">
                <h4>Construction Quality</h4>
                <p>Uncompromising quality, built right into every detail.</p>
              </div>
            </AmenityCard>

            <AmenityCard>
              <img src="/assets/play.svg" alt="Children Play Area" />
              <div className="text">
                <h4>Children Play Area</h4>
                <p>A lively play area with swings, slides, and adventures.</p>
              </div>
            </AmenityCard>

            <AmenityCard>
              <img src="/assets/water.svg" alt="24x7 Water Supply" />
              <div className="text">
                <h4>24x7 Water Supply</h4>
                <p>Water at your service around the clock.</p>
              </div>
            </AmenityCard>

            <AmenityCard>
              <img src="/assets/club.svg" alt="Club House" />
              <div className="text">
                <h4>Club House</h4>
                <p>Indoor play & community hall for elevated lifestyle.</p>
              </div>
            </AmenityCard>

            <AmenityCard>
              <img src="/assets/lift.svg" alt="Automatic Lift" />
              <div className="text">
                <h4>Automatic Lift</h4>
                <p>Enhancing your convenience.</p>
              </div>
            </AmenityCard>

            <AmenityCard>
              <img src="/assets/generator.svg" alt="Generator Backup" />
              <div className="text">
                <h4>Generator Backup</h4>
                <p>Back up Generator for Lift, Pump & Lights.</p>
              </div>
            </AmenityCard>
          </AmenitiesGrid>
        </RightSection>
      </Content>
      <hr></hr>
      </Section1>

      
    </>
  );
};

export default WhyChooseUs;
