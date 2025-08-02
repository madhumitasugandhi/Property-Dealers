import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Wrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #f1f5f9, #e0f2fe);
  padding: 80px 20px;
  display: flex;
  justify-content: center;
`;

const Card = styled(motion.div)`
  max-width: 800px;
  background: #fff;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.07);
  border: 1px solid #e5e7eb;
`;

const TitleContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 2rem;
`;

const StyledTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #1f2937;
  position: relative;
  z-index: 1;
`;

const BigBox = styled.div`
  position: absolute;
  top: 6px;
  left: -20px;
  width: 60px;
  height: 60px;
  background-color: #2563eb;
  border-radius: 6px;
  z-index: 0;
`;

const SmallBox = styled.div`
  position: absolute;
  top: -10px;
  left: 18px;
  width: 30px;
  height: 30px;
  background-color: #2563eb;
  border: 2px solid white;
  border-radius: 6px;
  z-index: 0;
`;

const Section = styled(motion.div)`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  color: #1e40af;
  margin-bottom: 10px;
`;

const Text = styled.p`
  font-size: 1.05rem;
  line-height: 1.7;
  color: #374151;
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

const PrivacyPolicy = () => {
  const sections = [
    {
      title: '1. Information Collection',
      text: 'We collect personal data like name, email, and contact number when you interact with our services — such as property inquiries or account registration.',
    },
    {
      title: '2. How We Use Your Data',
      text: 'We use your information to provide tailored property recommendations, send updates, and improve our platform. Your data helps us enhance your experience.',
    },
    {
      title: '3. Sharing & Security',
      text: 'We never sell your personal data. Information is only shared with trusted partners for essential services like legal advice or loan assistance — with your consent.',
    },
    {
      title: '4. Cookies & Tracking',
      text: 'We use cookies to analyze user behavior and improve our website’s functionality. You can control cookie preferences via browser settings.',
    },
    {
      title: '5. Your Rights',
      text: 'You can request to access, update, or delete your data at any time. We are committed to maintaining your privacy and complying with legal standards.',
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
        <TitleContainer>
          <BigBox />
          <SmallBox />
          <StyledTitle>Privacy Policy</StyledTitle>
        </TitleContainer>

        {sections.map((section, i) => (
          <Section key={i} variants={fadeInItem}>
            <SectionTitle>{section.title}</SectionTitle>
            <Text>{section.text}</Text>
          </Section>
        ))}

        <Text style={{ marginTop: '30px', fontSize: '0.9rem', color: '#6b7280' }}>
          If you have questions regarding our privacy practices, please reach out to us via the{' '}
          <a href="/contact" style={{ color: '#2563eb', textDecoration: 'underline' }}>Contact page</a>.
        </Text>
      </Card>
    </Wrapper>
  );
};

export default PrivacyPolicy;
