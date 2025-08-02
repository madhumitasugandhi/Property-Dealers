import React, { useState } from 'react';
import styled from 'styled-components';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const FormWrapper = styled.div`
  backdrop-filter: blur(15px);
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 420px;
  color: #fff;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  font-weight: bold;
  letter-spacing: 1px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 1.25rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  padding-right: 2.5rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  outline: none;
  transition: 0.3s ease;

  &::placeholder {
    color: #ccc;
  }

  &:focus {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid #66aaff;
  }
`;

const Error = styled.p`
  color: #ff7675;
  font-size: 0.8rem;
  margin-top: -0.8rem;
  margin-bottom: 0.5rem;
`;

const EyeIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #ccc;
  cursor: pointer;
  font-size: 1rem;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0 1.5rem 0;
  font-size: 0.9rem;
`;

const Button = styled.button`
  background: linear-gradient(to right, #00c6ff, #0072ff);
  color: #fff;
  border: none;
  padding: 0.75rem;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(to right, #0072ff, #00c6ff);
  }
`;

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    remember: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    else if (formData.username.length < 4)
      newErrors.username = 'Minimum 4 characters required';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6)
      newErrors.password = 'Minimum 6 characters required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('Login successful!');
      console.log('Data:', formData);
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
            {/* No icon needed for username */}
          </InputWrapper>
          {errors.username && <Error>{errors.username}</Error>}

          <Label htmlFor="password">Password</Label>
          <InputWrapper>
            <Input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
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
