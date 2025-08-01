import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const FooterWrapper = styled.footer`
  background-color: #151c22;
  color: #fff;
  padding: 2rem 1.5rem 3rem;
  margin: 0 auto;
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
  gap: 1.5rem;
  box-sizing: border-box;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    gap: 2rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const Section = styled.div`
  flex: 1;
  max-width: 100%;
  box-sizing: border-box;

  @media (max-width: 480px) {
    p {
      font-size: 0.9rem;
    }
  }
`;

const Title = styled.h4`
  font-size: 20px;
  color: #52a1e2;
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const Link = styled.a`
  display: block;
  color: #fff;
  text-decoration: none;
  margin-bottom: 0.5rem;
  font-size: 1rem;

  &:hover {
    color: #fff;
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

    &:hover {
      color: #fff;
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
  box-sizing: border-box;

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

      <Copyright>
        © {new Date().getFullYear()} Property Dealers. All rights reserved.
      </Copyright>
    </>
  );
};

export default Footer;