import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  max-width: 1000px;
  margin: 40px auto;
  padding: 0 16px;
`;

const Section = styled(motion.div)`
  margin-bottom: 2.5rem;
`;

const Heading = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 2.5rem);
  color: #b80000;
  font-weight: 800;
  text-align: center;
  margin-top:10rem;
  margin-bottom: 1rem;
`;

const Text = styled(motion.p)`
  font-size: clamp(1rem, 3.5vw, 1.125rem);
  color: #4b5563;
  line-height: 1.8;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled(motion.div)`
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  color: #b80000;
  margin-bottom: 0.5rem;
`;

const ContactCTA = styled.div`
  text-align: center;
  margin-top: 3rem;
`;

const ContactButton = styled(motion.a)`
  display: inline-block;
  background: #b80000;
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 1rem;
  cursor: pointer;
  &:hover {
    background: #a10000;
  }
`;

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const About = () => (
  <Container>
    <Section initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <Heading variants={fadeIn}>About YAVATMAL</Heading>
      <Text variants={fadeIn} custom={1}>
        Founded in 1990, Royale Realtors is one of the most esteemed real estate management companies in South Delhi. We have helped hundreds of clients achieve their property goals in residential, commercial, leasing and investment domains.
      </Text>
      <Text variants={fadeIn} custom={2}>
        Our legacy is built on client-first dedication: personalized services, transparent dealings, fair pricing, and expert guidance for a seamless experience.
      </Text>
    </Section>

    <Section initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <FeatureGrid>
        {[0, 1, 2].map((i) => (
          <FeatureCard key={i} variants={fadeIn} custom={i}>
            <FeatureTitle>
              {i === 0 ? 'Our Mission' : i === 1 ? 'Our Vision' : 'Why Choose Us'}
            </FeatureTitle>
            <Text>
              {i === 0 &&
                'To offer best‑in‑class real estate advisory, transparent consultancy, and management services tailored to your needs.'}
              {i === 1 &&
                'To shape South Delhi real estate excellence through innovation, integrity & unmatched customer experience.'}
              {i === 2 &&
                'Expert team, local expertise in high‑end markets, personalized solutions, and over 30 years of trust.'}
            </Text>
          </FeatureCard>
        ))}
      </FeatureGrid>
    </Section>

    <Section initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <Heading variants={fadeIn} custom={1}>Founder’s Message</Heading>
      <Text variants={fadeIn} custom={2}>
        "Continuing to care for our client's interests and aspiring to perfection..." – Lalit Kaushik, Co‑founder. Our philosophy is about trust, transparency, and client satisfaction.
      </Text>
    </Section>

    <ContactCTA>
      <Text as={motion.p} variants={fadeIn} initial="hidden" whileInView="visible">
        Questions or ready to talk? Reach out anytime:
      </Text>
      <ContactButton
        href="/contact"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        whileHover={{ scale: 1.05 }}
      >
        Contact Us
      </ContactButton>
    </ContactCTA>
  </Container>
);

export default About;
