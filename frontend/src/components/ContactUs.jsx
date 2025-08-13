import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Flat from "../assets/flat.jpg";

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
  width: clamp(40px, 10vw, 80px);
`;

const Container = styled(motion.div)`
  max-width: 1100px;
  margin: 80px auto;
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

// Flex layout for form + map
const FlexWrap = styled.div`
  display: flex;
  gap: 100px;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const FormWrapper = styled.div`
  flex: 1;
  min-width: 300px;
  border: 1px solid #2d97eeff;
  border-radius: 15px;
  padding: 20px;

  @media (max-width: 900px) {
    min-height: 300px;
    width: 86%;
    padding: 5px;
    margin: 0 auto; /* center in mobile view */
  }

  @media (max-width: 500px) {
    min-height: 250px;
    width: 86%;
    padding: 5px;
    margin: 0 auto;
  }
`;

const MapWrapper = styled.div`
  flex: 1;
  min-width: 300px;

  iframe {
    width: 100%;
    height: 93%;
    min-height: 500px;
    border: 1px solid #2d97eeff;
    border-radius: 15px;
    padding: 20px;
  }

  @media (max-width: 900px) {
    iframe {
      min-height: 300px;
      width: 86%;
      margin: 0 auto;
    }
  }

  @media (max-width: 500px) {
    iframe {
      min-height: 250px;
      width: 86%;
      margin: 0 auto;
    }
  }
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

const SubmitButton = styled(motion.button)`
  background-color: #2d97eeff;
  width: 50%;
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
    width: 80%;
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
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    flats: [],
    preferredLocations: [],
    requirements: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        [field]: [...formData[field], value],
      });
    } else {
      setFormData({
        ...formData,
        [field]: formData[field].filter((item) => item !== value),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        setFormData({
          name: "",
          phone: "",
          flats: [],
          preferredLocations: [],
          requirements: "",
        });
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("Error submitting form");
      console.error(error);
    }
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

        <FlexWrap>
          {/* Left Side Form */}
          <FormWrapper>
            <Form onSubmit={handleSubmit}>
              <Label variants={fadeUp} custom={2}>
                Name *
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </Label>

              <Label variants={fadeUp} custom={3}>
                Phone Number *
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </Label>

              <Fieldset variants={fadeUp} custom={5}>
                <Legend>Flats *</Legend>
                {["1BHK", "2BHK", "Shop"].map((flat) => (
                  <CheckboxLabel key={flat}>
                    <input
                      type="checkbox"
                      value={flat}
                      checked={formData.flats.includes(flat)}
                      onChange={(e) => handleCheckboxChange(e, "flats")}
                    />
                    {flat}
                  </CheckboxLabel>
                ))}
              </Fieldset>

              <Fieldset variants={fadeUp} custom={6}>
                <Legend>Preferred Location</Legend>
                {[
                  "Arni",
                  "Umarkhed",
                  "Kalamb",
                  "Pandharkawada",
                  "Ghatanji",
                  "Zari-Jamni",
                  "Darwha",
                  "Digras",
                  "Ner",
                  "Pusad",
                  "Babhulgaon",
                  "Mahagaon",
                  "Maregaon",
                  "Yavatmal",
                  "Ralegaon",
                  "Wani",
                ].map((location) => (
                  <CheckboxLabel key={location}>
                    <input
                      type="checkbox"
                      value={location}
                      checked={formData.preferredLocations.includes(location)}
                      onChange={(e) =>
                        handleCheckboxChange(e, "preferredLocations")
                      }
                    />
                    {location}
                  </CheckboxLabel>
                ))}
              </Fieldset>

              <Label variants={fadeUp} custom={7}>
                Requirements
                <TextArea
                  rows="4"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  placeholder="Tell us more about what you're looking for..."
                />
              </Label>

              <SubmitButton
                type="submit"
                variants={fadeUp}
                custom={9}
                whileHover={{ scale: 1.05 }}
              >
                Submit
              </SubmitButton>
            </Form>
          </FormWrapper>

          {/* Right Side Map */}
          <MapWrapper>
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3722.282306124107!2d78.1226343142453!3d20.38966998636801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd2bfe0d0f73f2d%3A0x8b4f4b99b45e9f9a!2sGodhani%20Rd%2C%20Bajoriya%20Nagar%2C%20Yavatmal%2C%20Maharashtra%20445001!5e0!3m2!1sen!2sin!4v1694600000000!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </MapWrapper>
        </FlexWrap>
      </Container>
    </div>
  );
};

export default Contact;
