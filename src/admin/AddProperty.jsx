import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 2rem;
  background: #f1f5f9;
  min-height: 100vh;
`;

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  display: grid;
  gap: 1.2rem;
  max-width: 600px;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  font-size: 1rem;
  resize: vertical;
`;

const Button = styled.button`
  padding: 0.75rem;
  background: #0f172a;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background: #1e293b;
  }
`;

const AddProperty = () => {
  const [form, setForm] = useState({
    title: '',
    location: '',
    price: '',
    description: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    // Add logic to send data to backend
  };

  return (
    <Wrapper>
      <h2>Add New Property</h2>
      <Form onSubmit={handleSubmit}>
        <Input type="text" name="title" placeholder="Property Title" onChange={handleChange} required />
        <Input type="text" name="location" placeholder="Location" onChange={handleChange} required />
        <Input type="number" name="price" placeholder="Price" onChange={handleChange} required />
        <TextArea name="description" rows="5" placeholder="Description" onChange={handleChange} required />
        <Input type="file" name="image" accept="image/*" onChange={handleChange} required />
        <Button type="submit">Submit</Button>
      </Form>
    </Wrapper>
  );
};

export default AddProperty;
