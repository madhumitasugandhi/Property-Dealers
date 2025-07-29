import React, { useState } from "react";
import styled from "styled-components";
import ReCAPTCHA from "react-google-recaptcha";

const RecaptchaBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;
const SITE_KEY = "YOUR_RECAPTCHA_SITE_KEY";

const Contact = () => {
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!captchaValue) {
      alert("Please complete the CAPTCHA!");
      return;
    }
    alert("Form submitted successfully!");
  };

  return (
    <Container>
      <Title>Get in Touch</Title>
      <SubTitle>Fill out the form below — we’ll get back to you soon!</SubTitle>

      <Form onSubmit={handleSubmit}>
        <Label>
          Name *
          <Input type="text" required placeholder="Enter your name" />
        </Label>

        <Label>
          Phone Number *
          <Input type="text" required placeholder="Enter your phone number" />
        </Label>

        <Label>
          Email
          <Input type="email" placeholder="Enter your email (optional)" />
        </Label>

        <Fieldset>
          <Legend>Flats *</Legend>
          <CheckboxGroup>
            <CheckboxLabel><input type="checkbox" /> 1BHK</CheckboxLabel>
            <CheckboxLabel><input type="checkbox" /> 2BHK</CheckboxLabel>
            <CheckboxLabel><input type="checkbox" /> Shop</CheckboxLabel>
          </CheckboxGroup>
        </Fieldset>

        <Fieldset>
          <Legend>Preferred Location</Legend>
          <CheckboxGroup>
            <CheckboxLabel><input type="checkbox" /> Dabha</CheckboxLabel>
            <CheckboxLabel><input type="checkbox" /> Wanjara</CheckboxLabel>
            <CheckboxLabel><input type="checkbox" /> Beltarodi</CheckboxLabel>
            <CheckboxLabel><input type="checkbox" /> Hazaripahad</CheckboxLabel>
            <CheckboxLabel><input type="checkbox" /> Godhani</CheckboxLabel>
          </CheckboxGroup>
        </Fieldset>

        <Label>
          Additional Requirements
          <TextArea rows="4" placeholder="Tell us what you're looking for..." />
        </Label>

        <RecaptchaBox>
          <ReCAPTCHA
            sitekey={SITE_KEY}
            onChange={(value) => setCaptchaValue(value)}
          />
        </RecaptchaBox>

        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
    </Container>
  );
};

export default Contact;
