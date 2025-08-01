import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import Flat from '../assets/flat.jpg'

const RECAPTCHA_SITE_KEY = "6Ld0dJUrAAAAAOv_VcDBUq6A4lhlWcIjHMpjfEh-";

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



const Container = styled(motion.div)`
  max-width: 900px;
  margin: 100px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled(motion.h2)`
  text-align: center;
  margin-bottom: 10px;
  font-size: 20px;
  color: #333;
`;

const SubTitle = styled(motion.h3)`
  text-align: center;
  margin-bottom: 30px;
  font-size: 26px;
  color: #555;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Label = styled(motion.label)`
  display: flex;
  flex-direction: column;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  margin-top: 6px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  margin-top: 6px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
`;

const Fieldset = styled(motion.fieldset)`
  border: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const Legend = styled.legend`
  font-weight: bold;
  margin-bottom: 6px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: normal;
`;

const RecaptchaBox = styled(motion.div)`
  margin: 10px auto;
  text-align: center;
`;

const SubmitButton = styled(motion.button)`
  background-color: #2d97eeff;
  width: 15%;
  margin: 5px auto;
  color: white;
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #005ca8;
  }

  @media (max-width: 768px) {
    width: 80%; /* 
    font-size: 14px;
    padding: 10px 20px;
  }
`;


const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Contact = () => {
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
    console.log("ReCAPTCHA token:", token);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!recaptchaToken) {
      alert("Please complete the CAPTCHA before submitting.");
      return;
    }
    alert("Form submitted successfully!");
  };

  return (
    <div>
      <PageBanner>
        <h1>Contact Us</h1>
        <AnimatedLine
          initial={{ width: 0 }}
          animate={{ width: "150px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </PageBanner>

      <Container initial="hidden" animate="visible" variants={fadeUp}>
        <Title variants={fadeUp} custom={0}>
          Submit our online form to request an estimate or for general questions
        </Title>
        <SubTitle variants={fadeUp} custom={1}>
          We look forward to serving you!
        </SubTitle>

        <Form onSubmit={handleSubmit}>
          <Label variants={fadeUp} custom={2}>
            Name *
            <Input type="text" required />
          </Label>

          <Label variants={fadeUp} custom={3}>
            Phone Number *
            <Input type="tel" required />
          </Label>

          <Label variants={fadeUp} custom={4}>
            Email
            <Input type="email" />
          </Label>

          <Fieldset variants={fadeUp} custom={5}>
            <Legend>Flats *</Legend>
            <CheckboxLabel><input type="checkbox" /> 1BHK</CheckboxLabel>
            <CheckboxLabel><input type="checkbox" /> 2BHK</CheckboxLabel>
            <CheckboxLabel><input type="checkbox" /> Shop</CheckboxLabel>
          </Fieldset>

          <Fieldset variants={fadeUp} custom={6}>
            <Legend>Preferred Location</Legend>
            <CheckboxLabel><input type="checkbox" /> Dabha</CheckboxLabel>
            <CheckboxLabel><input type="checkbox" /> Wanjara</CheckboxLabel>
            <CheckboxLabel><input type="checkbox" /> Beltarodi</CheckboxLabel>
            <CheckboxLabel><input type="checkbox" /> Hazaripahad</CheckboxLabel>
            <CheckboxLabel><input type="checkbox" /> Godhani</CheckboxLabel>
          </Fieldset>

          <Label variants={fadeUp} custom={7}>
            Requirements
            <TextArea rows="4" placeholder="Tell us more about what you're looking for..." />
          </Label>

          <RecaptchaBox variants={fadeUp} custom={8}>
            <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} onChange={handleRecaptchaChange} />
          </RecaptchaBox>

          <SubmitButton
            type="submit"
            variants={fadeUp}
            custom={9}
            whileHover={{ scale: 1.05 }}
          >
            Submit
          </SubmitButton>
        </Form>
      </Container>
    </div>
  );
};

export default Contact;
