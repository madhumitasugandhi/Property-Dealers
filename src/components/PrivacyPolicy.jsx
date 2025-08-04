import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const ModalBackdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled(motion.div)`
  width: 100%;
  max-width: 800px;
  max-height: 80vh;
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  overflow-y: auto;
`;

const CloseBtn = styled(motion.button)`
  background: #dfe6e9;
  color: #2d3436;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  padding: 6px 10px;
  align-self: flex-end;
  cursor: pointer;
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

const PrivacyPolicy = ({ show, onClose }) => {
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
    <AnimatePresence>
      {show && (
        <ModalBackdrop
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalWrapper
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseBtn
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
            >
              X
            </CloseBtn>
            <TitleContainer>
              <BigBox />
              <SmallBox />
              <StyledTitle>Privacy Policy</StyledTitle>
            </TitleContainer>
            <motion.div variants={fadeInStagger} initial="hidden" animate="visible">
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
            </motion.div>
          </ModalWrapper>
        </ModalBackdrop>
      )}
    </AnimatePresence>
  );
};

export default PrivacyPolicy;