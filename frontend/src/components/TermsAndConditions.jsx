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

const TitleWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #000000;
  font-weight: 800;
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
  top: -12px;
  left: 15px;
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

const TermsAndConditions = ({ show, onClose }) => {
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
            <TitleWrapper>
              <BigBox />
              <SmallBox />
              <Title>Terms & Conditions</Title>
            </TitleWrapper>
            <motion.div variants={fadeInStagger} initial="hidden" animate="visible">
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
            </motion.div>
          </ModalWrapper>
        </ModalBackdrop>
      )}
    </AnimatePresence>
  );
};

export default TermsAndConditions;