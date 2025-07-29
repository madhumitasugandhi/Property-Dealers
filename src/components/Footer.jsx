
import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const FooterWrapper = styled.footer`
  background-color: #1f2937;
  color: #d1d5db;
  padding: 2rem 1rem;
  margin-top: 4rem;
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media(min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Section = styled.div`
  flex: 1;
`;

const Title = styled.h4`
  font-size: 18px;
  color: #facc15;
  margin-bottom: 1rem;
`;

const Link = styled.a`
  display: block;
  color: #d1d5db;
  text-decoration: none;
  margin-bottom: 0.5rem;

  &:hover {
    color: white;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 1.5rem;
  margin-top: 1rem;

  a {
    color: #d1d5db;

    &:hover {
      color: white;
    }
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContainer>
        <Section>
          <Title>Property Dealers</Title>
          <p>Find your dream home with us. Best deals in top locations across the city.</p>
          <SocialIcons>
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
          </SocialIcons>
        </Section>

        <Section>
          <Title>Quick Links</Title>
          <Link href="#">Home</Link>
          <Link href="#">Properties</Link>
          <Link href="#">About</Link>
          <Link href="#">Contact</Link>
        </Section>

        <Section>
          <Title>Contact Us</Title>
          <p>Email: info@propertydealers.com</p>
          <p>Phone: +91 9876543210</p>
          <p>Address: Connaught Place, New Delhi</p>
        </Section>
      </FooterContainer>
    </FooterWrapper>
  );
};

export default Footer;
