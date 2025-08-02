import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaYoutube, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const FooterWrapper = styled.footer`
  background-color: #0f172a;
  color: #e2e8f0;
  padding: 2rem 1.5rem 3rem;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;

  @media (max-width: 868px) {
    padding: 1.5rem 1rem 2.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 0.75rem 2rem;
  }
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  box-sizing: border-box;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    gap: 2.5rem;
  }
`;

const Section = styled.div`
  flex: 1;
  box-sizing: border-box;

  p {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 0.75rem;

    @media (max-width: 480px) {
      font-size: 0.9rem;
    }
  }
`;

const Title = styled.h4`
  font-size: 1.25rem;
  color: #38bdf8;
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const StyledLink = styled.a`
  display: block;
  color: #fff;
  text-decoration: none;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  transition: color 0.2s ease;

  &:hover {
    color: #60a5fa;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 1.5rem;
  margin-top: 1rem;

  a {
    color: #fff;
    transition: transform 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      color: #60a5fa;
      transform: scale(1.2);
      box-shadow: 0 0 8px rgba(82, 161, 226, 0.5);
    }
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
    gap: 0.75rem;
  }
`;

const Copyright = styled.div`
  width: 100%;
  background-color: #f3f4f6;
  color: #4b5563;
  text-align: center;
  font-size: 0.9rem;
  padding: 1rem 0;

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.75rem 0;
  }
`;

const Footer = () => {
  return (
    <>
      <FooterWrapper>
        <FooterContainer>
          <Section>
            <Title>YAVATMAL PROPERTY VALA</Title>
            <p>
              Find your dream home with us. Best deals in top locations across the city.
            </p>
            <SocialIcons>
              <a href="https://www.facebook.com/share/1QGso4WkRU/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
              <a href="https://youtube.com/@yavatmal_proparty_vala?si=Gj06MglPUAuElLFz" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
              <a href="https://www.instagram.com/yavatmal_property_vala/profilecard/?igsh=eWhuZHp3NWIwY21t" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            </SocialIcons>
          </Section>

          <Section>
            <Title>Quick Links</Title>
            <StyledLink href="/">Home</StyledLink>
            <StyledLink href="/about">About Us</StyledLink>
            <StyledLink href="/contact">Contact Us</StyledLink>
          </Section>

          <Section>
            <Title>Contact Us</Title>
            <p>Email: info@propertydealers.com</p>
            <p>Phone: +91 93256 87798</p>
            <p>Address: Connaught Place, New Delhi</p>
          </Section>
        </FooterContainer>
      </FooterWrapper>

      <Copyright>
  © {new Date().getFullYear()} YAVATMAL PROPERTY VALA — All rights reserved |  
  <span style={{ marginLeft: '0.5rem', fontSize: '0.9rem' }}>
    <Link
      to="/terms"
      style={{  color:'#003e73', textDecoration: 'underline' , marginRight:"0.5rem"}}
    >
      Terms & Conditions
    </Link> | 
    <Link
      to="/privacypolicy"
      style={{ marginLeft: '0.5rem', color: '#003e73', textDecoration: 'underline' }}
    >
      Privacy Policy
    </Link>
  </span>
</Copyright>


    </>
  );
};

export default Footer;
