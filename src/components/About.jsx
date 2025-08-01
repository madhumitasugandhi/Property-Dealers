// About.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import Farm from '../assets/farm.jpg';
import BgImg from '../assets/bg4.jpeg';
import Flat from '../assets/flat.jpg';

const PageWrapper = styled.div`
  background: url(${BgImg}) center/cover no-repeat fixed;
  min-height: 100vh;
  width: 100%;
`;

const PageBanner = styled.section`
  background: url(${Flat}) center/cover no-repeat;
  height: 200px;
  padding: 6rem 2rem 4rem;
  text-align: center;
  color: #fff;
  position: relative;

  h1 {
    font-size: clamp(2rem, 6vw, 3rem);
    font-weight: 600;
    margin-bottom: 1rem;
    z-index: 2;
    position: relative;
  }
`;
const AnimatedLine = styled(motion.div)`
  height: 4px;
  background-color: #fff;
  margin: 0 auto;
  z-index: 2;
  position: relative;

  /* Responsive width using clamp */
  width: clamp(40px, 10vw, 80px);
`;


const OverlaySection = styled.section`
  padding: 100px 20px;
  text-align: center;
  color: white;
  background: rgba(0, 0, 0, 0.6);

  h2 {
    font-size: 1.5rem;
    max-width: 900px;
    margin: 0 auto;
    font-weight: 500;
    line-height: 1.7;
  }

  h2::after {
    content: '';
    display: block;
    height: 4px;
    width: 60px;
    background: white;
    margin: 20px auto 0;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: full;
  margin: auto;
`;

const Section = styled(motion.section)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background-color: #f0f0f0;
  padding: 4rem 6rem;
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};

  @media (max-width: 992px) {
    padding: 2rem 1rem;
    flex-direction: column;
  }
`;

const TextBlock = styled(motion.div)`
  flex: 1;
  padding: 1rem 2rem;
  min-width: 300px;
`;

const ImageBlock = styled(motion.div)`
  width: 100%;
  max-width: 600px;
  overflow: hidden;
  border-radius: 1rem;
  margin-bottom: 1rem;

  img {
    width: 95%;
    height: auto;
    display: block;
    border-radius: 1rem;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Heading = styled.h2`
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  color: #005ca8;
  margin-bottom: 1rem;
`;

const Text = styled.p`
  font-size: 1.1rem;
  color: #444;
  line-height: 1.7;
`;

// --- Animations ---
const imageVariantLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const imageVariantRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const textVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const About = () => {
  return (
    <PageWrapper>
      <PageBanner>
        <h1>About Us</h1>
        <AnimatedLine
          initial={{ width: 0 }}
          animate={{ width: "150px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </PageBanner>

      <section style={{ background: "#f0f0f0", padding: "5rem 1rem 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1rem" }}>
          <h1 style={{
            fontSize: "2.2rem",
            fontWeight: "600",
            color: "#000",
            lineHeight: "1.4",
            position: "relative",
            display: "inline-block"
          }}>
            <span style={{ position: "relative", display: "inline-block", zIndex: 1 }}>
              OUR
              <span style={{
                position: "absolute", top: "-15px", left: "-20px", width: "60px", height: "60px",
                backgroundColor: "#005ca8", borderRadius: "8px", zIndex: -2,
              }} />
              <span style={{
                position: "absolute", top: "-35px", left: "25px", width: "30px", height: "30px",
                backgroundColor: "#005ca8", border: "2px solid white", borderRadius: "6px", zIndex: -1,
              }} />
            </span>{" "}
            <span style={{ color: "#005ca8" }}>MISSION</span> AND <br />
            <span style={{ color: "#005ca8" }}>VISION</span>
          </h1>

          <div style={{
            width: "50px",
            height: "3px",
            backgroundColor: "#005ca8",
            marginTop: "1rem"
          }} />
        </div>
      </section>

      <Container>
        <Section initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <ImageBlock variants={imageVariantLeft}>
            <img src={Farm} alt="About Yavatmal" />
          </ImageBlock>
          <TextBlock variants={textVariant}>
            <Heading>MISSION</Heading>
            <Text>
              Our mission is to offer best-in-class real estate advisory, consultancy, and management services to our clients and help them achieve their property goals. We focus on improving our clients’ lives by offering bespoke solutions to all their real estate aspirations.
            </Text>
          </TextBlock>
        </Section>

        <Section reverse initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <ImageBlock variants={imageVariantRight}>
            <img src={Farm} alt="Our Mission" />
          </ImageBlock>
          <TextBlock variants={textVariant}>
            <Heading>VISION</Heading>
            <Text>
              Our vision is to create a noticeable impact on the real estate market of South Delhi by driving innovation, customer excellence with unmatched service standards with a spotlight on the super-rich segment. We intend to establish trust and become the go-to solution for all sorts of real estate needs in South Delhi.
            </Text>
          </TextBlock>
        </Section>

        <OverlaySection>
          <h2>
            Please follow us a suitable time for a meeting, with one-to-one discussion, over a coffee,
            to understand your requirements in a better way so that we can initiate and schedule a very
            focused and productive program suiting your needs, taste, budget, and preferences.
          </h2>
        </OverlaySection>

        <Section initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <ImageBlock variants={imageVariantLeft}>
            <img src={Farm} alt="Founder" />
          </ImageBlock>

          <TextBlock variants={textVariant}>
            <Heading>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  whiteSpace: "nowrap",
                  position: "relative",
                  paddingLeft: "80px",
                }}
              >
                {/* Big Box */}
                <span
                  style={{
                    position: "absolute",
                    top: "-15px",
                    left: "60px",
                    width: "60px",
                    height: "60px",
                    backgroundColor: "#005ca8",
                    borderRadius: "8px",
                    zIndex: 1,
                  }}
                />
                {/* Small Box */}
                <span
                  style={{
                    position: "absolute",
                    top: "-35px",
                    left: "100px",
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#005ca8",
                    border: "2px solid white",
                    borderRadius: "6px",
                    zIndex: 2,
                  }}
                />
                <span
                  style={{
                    color: "#000",
                    fontWeight: "600",
                    fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                    zIndex: 3,
                  }}
                >
                  Founder’s&nbsp;<span style={{color:'#005ca8'}}>Message</span>
                </span>
              </span>
            </Heading>


            <Text>
              Passion for property... we were born with it!
              <br /><br />
              Dear Clients,
              <br />
              Continuing to care of our client’s interests and aspiring to perfection process. We place emphasis
              on innovations and aspire to create a company which effectively answers varying inquiries of market
              and benefits people. We always guide you on all the available prime properties with the best
              locations, prices and payment options so that you will end up with the best decision for your homes
              and/or investment.
              <br /><br />
              Our clients' satisfaction is a reflection of our success. Their ideas and suggestions flow openly and
              regularly, based on a foundation of mutual trust and respect. We always work on expanding our growth,
              productivity, effectiveness and efficiency through clear strategy.
              <br /><br />
              I would like to sincerely thank our valued clients and partners for their continued support. We pride
              ourselves in the dedication and loyalty we provide to our clients in serving their needs faithfully no
              matter how challenging the requirement.
              <br /><br />
              Yours Sincerely,<br />
              Lalit Kaushik
            </Text>
          </TextBlock>
        </Section>
      </Container>
    </PageWrapper>
  );
};

export default About;
