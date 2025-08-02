import React, { useState } from "react";
import styled , { keyframes }from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;


const Container = styled.div`
  min-height: 100vh;
  overflow-x: hidden; /* prevents horizontal scroll */
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #e0eafc, #cfdef3);
  padding: 1rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const FormWrapper = styled.div`
  background: #ffffffcc;
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  min-width: 280px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  overflow: hidden;
  animation: ${fadeInUp} 0.8s ease-out;
`;


const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.8rem;
  font-size: 1.75rem;
  color: #2c3e50;
  animation: fadeInUp 1s ease forwards;
`;


const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: #34495e;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 1.25rem;
`;

const Input = styled.input`
  width: 80%;
  padding: 0.7rem 1rem;
  padding-right: 3rem;
  border: 1px solid #bdc3c7;
  border-radius: 8px;
  font-size: 1rem;
  background: #f9f9f9;
  color: #2c3e50;
  transition: all 0.3s ease;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    border-color: #3498db;
    background: #fff;
    outline: none;
    box-shadow: 0 0 8px rgba(52, 152, 219, 0.4);
  }

  &::-ms-reveal,
  &::-ms-clear {
    display: none;
  }

  &::-webkit-credentials-auto-fill-button,
  &::-webkit-clear-button {
    display: none !important;
  }
`;


const EyeIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 0.8rem; /* was 1rem — reduce slightly for tight fit */
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 2;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Error = styled.p`
  color: #e74c3c;
  font-size: 0.8rem;
  margin-top: -0.8rem;
  margin-bottom: 0.5rem;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: #34495e;
  margin-bottom: 1.25rem;
  cursor: pointer;
`;

const Button = styled.button`
  background: linear-gradient(to right, #27ae60, #2ecc71);
  color: #fff;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(to right, #2ecc71, #27ae60);
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;



const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    else if (formData.username.length < 4)
      newErrors.username = "Minimum 4 characters required";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Minimum 6 characters required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Login successful!");
      console.log("Login Data:", formData);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Admin Login</Title>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="username">Username</Label>
          <InputWrapper>
            <Input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />
          </InputWrapper>
          {errors.username && <Error>{errors.username}</Error>}

          <Label htmlFor="password">Password</Label>
          <InputWrapper>
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="new-password" // disables autofill & built-in icons
            />
            <EyeIcon onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </EyeIcon>
          </InputWrapper>
          {errors.password && <Error>{errors.password}</Error>}

          <CheckboxWrapper>
            <input
              type="checkbox"
              id="remember"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
            />
            <label htmlFor="remember">Remember me</label>
          </CheckboxWrapper>

          <Button type="submit">Login</Button>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default AdminLogin;
