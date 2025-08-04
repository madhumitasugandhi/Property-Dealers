import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

// Animation for form
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

// Animation for alert
const alertFade = keyframes`
  0% { opacity: 0; transform: scale(0.8); }
  10% { opacity: 1; transform: scale(1); }
  90% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.8); }
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
  width: 90%;
  padding: 0.7rem 1rem;
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

const Alert = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: ${props => props.error ? 'linear-gradient(90deg, #ff6b6b, #ff8c8c)' : 'linear-gradient(90deg, #00b894, #00cec9)'};
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  animation: ${alertFade} 2s ease-in-out forwards;
  z-index: 1000;
  text-align: center;
  width: auto;
  min-width: 250px;
  max-width: 80%;
  box-sizing: border-box;
  pointer-events: none;
  margin: 0; /* Remove any inherited margins */
  right: auto; /* Prevent right-side bias */
  transform-origin: center; /* Ensure transform is centered */

  /* Large screens (desktops, >1200px) */
  @media (min-width: 1200px) {
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
    min-width: 300px;
    max-width: 50%;
  }

  /* Medium screens (tablets, 768px–1200px) */
  @media (max-width: 1200px) and (min-width: 768px) {
    font-size: 0.9rem;
    padding: 0.6rem 1.2rem;
    min-width: 250px;
    max-width: 70%;
  }

  /* Small screens (mobile, <768px) */
  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
    min-width: 200px;
    max-width: 85%;
  }

  /* Extra small screens (very small mobile, <480px) */
  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: 0.4rem 0.8rem;
    min-width: 180px;
    max-width: 90%;
  }
`;


const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState({});
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  
  // Check login state on component mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
    if (isLoggedIn) {
      navigate("/admin/dashboard"); // Redirect to dashboard if already logged in
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const validate = () => {
    const newErrors = {};
    const passwordRegex = /^\d+$/;

    if (!formData.username.trim()) newErrors.username = "Username is required";

    if (!formData.password) newErrors.password = "Password is required";
    else if (!passwordRegex.test(formData.password))
      newErrors.password = "Password must contain only numbers";
    else if (formData.password.length < 6)
      newErrors.password = "Minimum 6 digits required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError(false);
    setLoginSuccess(false);

    if (validate()) {
      // Simulate username and password check
      if (formData.username === "admin" && formData.password === "123456") {
        setLoginSuccess(true);
        // Save login state to localStorage
        localStorage.setItem("isAdminLoggedIn", "true");
        setTimeout(() => {
          setLoginSuccess(false);
          navigate("/admin/dashboard"); // Redirect to dashboard
        }, 2000);
      } else {
        setLoginError(true);
        setTimeout(() => {
          setLoginError(false);
        }, 2000);
      }
    }
  };

 

  return (
    <>
      {loginSuccess && <Alert>Login Successful!</Alert>}
      {loginError && <Alert error>Something went wrong, check username or password</Alert>}
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
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="new-password"
              />
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
    </>
  );
};

export default AdminLogin;