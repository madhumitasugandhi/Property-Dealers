import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const FooterWrapper = styled.footer`
  background-color: #b80000;
  color: #fff;
  padding: 2rem 1rem 0;
  margin-top: 4rem;
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Section = styled.div`
  flex: 1;
`;

const Title = styled.h4`
  font-size: 20px;
  color: #f3ef12ff;
  margin-bottom: 1rem;
`;

const Link = styled.a`
  display: block;
  color: #fff;
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
    color: #fff;

    &:hover {
      color: white;
    }
  }
`;

const Copyright = styled.div`
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  background-color: #f3f4f6;
  color: #4b5563;
  text-align: center;
  font-size: 0.9rem;
  padding: 1rem 0;
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
