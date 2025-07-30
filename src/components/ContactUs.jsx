import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

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
  margin-top: 10px;
`;

const FakeRecaptcha = styled.div`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #f9f9f9;
  display: inline-block;
`;

const SubmitButton = styled(motion.button)`
  background-color: #e25555ff;
  width:15%;
  margin: 5px auto;
  color: white;
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #b80000;
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
  return (
    <Container
      initial="hidden"
      animate="visible"
      variants={fadeUp}
    >
      <Title variants={fadeUp} custom={0}>Submit our online form to request an estimate or for general questions</Title>
      <SubTitle variants={fadeUp} custom={1}>We look forward to serving you!</SubTitle>

      <Form>
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
          <FakeRecaptcha> I'm not a robot</FakeRecaptcha>
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
  );
};

export default Contact;
