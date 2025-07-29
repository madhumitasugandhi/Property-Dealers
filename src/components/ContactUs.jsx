import React from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 900px;
  margin: 60px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 10px;
  font-size: 20px;
  color: #333;
`;

const SubTitle = styled.h3`
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

const Label = styled.label`
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

const Fieldset = styled.fieldset`
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

const RecaptchaBox = styled.div`
  margin-top: 10px;
`;

const FakeRecaptcha = styled.div`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #f9f9f9;
  display: inline-block;
`;

const SubmitButton = styled.button`
  background-color: #0b5ed7;
  color: white;
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #094db5;
  }
`;

const Contact = () => {
  return (
    <Container>
      <Title>Submit our online form to request an estimate or for general questions</Title>
      <SubTitle>We look forward to serving you!</SubTitle>

      <Form>
        <Label>
          Name *
          <Input type="text" required />
        </Label>

        <Label>
          Phone Number *
          <Input type="tel" required />
        </Label>

        <Label>
          Email
          <Input type="email" />
        </Label>

        <Fieldset>
          <Legend>Flats *</Legend>
          <CheckboxLabel><input type="checkbox" /> 1BHK</CheckboxLabel>
          <CheckboxLabel><input type="checkbox" /> 2BHK</CheckboxLabel>
          <CheckboxLabel><input type="checkbox" /> Shop</CheckboxLabel>
        </Fieldset>

        <Fieldset>
          <Legend>Preferred Location</Legend>
          <CheckboxLabel><input type="checkbox" /> Dabha</CheckboxLabel>
          <CheckboxLabel><input type="checkbox" /> Wanjara</CheckboxLabel>
          <CheckboxLabel><input type="checkbox" /> Beltarodi</CheckboxLabel>
          <CheckboxLabel><input type="checkbox" /> Hazaripahad</CheckboxLabel>
          <CheckboxLabel><input type="checkbox" /> Godhani</CheckboxLabel>
        </Fieldset>

        <Label>
          Requirements
          <TextArea rows="4" placeholder="Tell us more about what you're looking for..." />
        </Label>

        <RecaptchaBox>
          <FakeRecaptcha>✅ I'm not a robot</FakeRecaptcha>
        </RecaptchaBox>

        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
    </Container>
  );
};

export default Contact;
