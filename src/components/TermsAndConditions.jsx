import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Wrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #f9fafb, #e0f2fe);
  padding: 80px 20px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const Card = styled(motion.div)`
  max-width: 800px;
  background: #ffffff;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.07);
  border: 1px solid #e5e7eb;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #1e3a8a;
  margin-bottom: 20px;
  border-bottom: 2px solid #93c5fd;
  padding-bottom: 10px;
`;

const Section = styled(motion.div)`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  color: #1e40af;
  margin-bottom: 10px;
`;

const Text = styled.p`
  color: #374151;
  line-height: 1.7;
  font-size: 1.05rem;
`;

const FooterNote = styled.p`
  margin-top: 40px;
  font-size: 0.9rem;
  color: #6b7280;
  border-top: 1px solid #e5e7eb;
  padding-top: 20px;
`;

const fadeInStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const fadeInItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const TermsAndConditions = () => {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      text: 'By accessing or using our services, you agree to be bound by these Terms and Conditions. Please read them carefully before proceeding.',
    },
    {
      title: '2. Property Information Accuracy',
      text: 'All property listings are subject to availability and may change without notice. While we strive for accuracy, we do not guarantee completeness.',
    },
    {
      title: '3. Legal & Financial Disclaimer',
      text: 'We are not liable for any legal or financial losses arising from the use of this website. Users are encouraged to consult professionals before making decisions.',
    },
    {
      title: '4. Changes to Terms',
      text: 'These terms may be updated periodically. Continued use of the platform implies agreement to the revised terms.',
    },
  ];

  return (
    <Wrapper>
      <Card
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInStagger}
      >
        <Title>Terms & Conditions</Title>

        {sections.map((section, index) => (
          <Section key={index} variants={fadeInItem}>
            <SectionTitle>{section.title}</SectionTitle>
            <Text>{section.text}</Text>
          </Section>
        ))}

        <FooterNote>
          For any queries, please reach out via our{' '}
          <a href="/contact" style={{ color: '#2563eb', textDecoration: 'underline' }}>
            contact page
          </a>.
        </FooterNote>
      </Card>
    </Wrapper>
  );
};

export default TermsAndConditions;
