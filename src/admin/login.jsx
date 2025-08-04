import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
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
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(90deg, #151c22 0%, #003e73 50%, #005ca8 100%);
  padding: 1rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const FormWrapper = styled.div`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 2.5rem;
  width: 100%;
  max-width: 400px;
  min-width: 280px;
  box-shadow: 0 12px 45px rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
  animation: ${fadeInUp} 0.8s ease-out;
  color: #ffffff;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.9rem;
  color: #ffffff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.9rem;
  margin-bottom: 0.4rem;
  color: #ffffffcc;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 1.25rem;
`;

const Input = styled.input`
  width: 80%;
  padding: 0.7rem 1rem;
  padding-right: 3rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;

  &::placeholder {
    color: #ddd;
  }

  &:focus {
    border-color: #00bfff;
    background: rgba(255, 255, 255, 0.25);
    outline: none;
    box-shadow: 0 0 8px rgba(0, 191, 255, 0.4);
  }

  &::-webkit-credentials-auto-fill-button,
  &::-webkit-clear-button {
    display: none !important;
  }
`;

const EyeIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 0.8rem;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 2;
  color: #fff;
`;

const Error = styled.p`
  color: #ff6b6b;
  font-size: 0.8rem;
  margin-top: -0.8rem;
  margin-bottom: 0.5rem;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: #ffffffcc;
  margin-bottom: 1.25rem;
  cursor: pointer;
`;

const Button = styled.button`
  background: linear-gradient(90deg, #00b894, #00cec9);
  color: #fff;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, #00cec9, #00b894);
    transform: scale(1.04);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
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
              autoComplete="new-password"
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
