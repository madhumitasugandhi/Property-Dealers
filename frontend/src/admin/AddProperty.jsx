// AddProperty.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Wrapper = styled.div`
  padding: 0.2rem 2rem;
  background: #f1f5f9;
  min-height: auto;
`;

const Tabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Tab = styled.button`
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  border: none;
  background: ${({ active }) => (active ? '#003e73' : '#e2e8f0')};
  color: ${({ active }) => (active ? 'white' : '#1e293b')};
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #003e73;
    color: white;
  }
`;

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
  display: grid;
  gap: 1.2rem;
  max-width: 600px;
  width: 100%;
  margin-top: 2rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  font-size: 1rem;
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  font-size: 1rem;
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
  const [activeTab, setActiveTab] = useState('flat');
  const [form, setForm] = useState({
    title: '',
    location: '',
    totalPrice: '',
    description: '',
    width: '',
    length: '',
    area: '',
    bhk: '',
    plotArea: '',
    shopSize: '',
    floor: '',
    landArea: '',
    taluka: '',
    propertyType: 'flat',
  });
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'images') {
      const newFiles = Array.from(files).filter(
        (file) => file.type.startsWith('image/') || file.type.startsWith('video/')
      );
      setImages(newFiles);
    } else {
      const updatedForm = { ...form, [name]: value };

      if (name === 'width' || name === 'length') {
        const width = parseFloat(name === 'width' ? value : form.width);
        const length = parseFloat(name === 'length' ? value : form.length);
        if (!isNaN(width) && !isNaN(length)) {
          updatedForm.area = (width * length).toFixed(2);
        } else {
          updatedForm.area = '';
        }
      }

      if (name === 'propertyType') {
        setActiveTab(value);
        updatedForm.propertyType = value;
      }

      setForm(updatedForm);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.location || !form.totalPrice || !form.propertyType) {
      alert('Title, location, totalPrice, and propertyType are required.');
      return;
    }

    if (isNaN(parseFloat(form.totalPrice))) {
      alert('Total Price must be a valid number.');
      return;
    }

    if (images.length === 0) {
      alert('Please upload at least one image or video.');
      return;
    }

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('location', form.location);
    formData.append('totalPrice', form.totalPrice);
    formData.append('description', form.description);
    formData.append('width', form.width);
    formData.append('length', form.length);
    formData.append('area', form.area);
    formData.append('propertyType', form.propertyType); // Ensure propertyType is sent
    formData.append('taluka', form.taluka);
    if (form.propertyType === 'flat') formData.append('bhk', form.bhk);
    if (form.propertyType === 'shop') formData.append('floor', form.floor);

    images.forEach((file) => {
      formData.append('image', file);
    });

    try {
      const res = await axios.post('http://localhost:5000/api/property', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Property added successfully');
      console.log('Success:', res.data);
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      alert('Failed to add property');
    }
  };

  return (
    <Wrapper>
      <h2>Add New Property</h2>

      <Tabs>
        {['flat', 'farm', 'shop', 'land'].map((tab) => (
          <Tab key={tab} active={activeTab === tab} onClick={() => setForm({ ...form, propertyType: tab })}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Tab>
        ))}
      </Tabs>

      <Form onSubmit={handleSubmit}>
        <Input type="text" name="title" placeholder="Property Title" onChange={handleChange} required />
        <Input type="text" name="location" placeholder="Location" onChange={handleChange} required />
        <Input type="text" name="taluka" placeholder="Taluka" onChange={handleChange} />
        <Input type="text" name="description" placeholder="Description" onChange={handleChange} />
        <Input type="number" name="totalPrice" placeholder="Total Price" onChange={handleChange} required />
        <Input type="number" name="width" placeholder="Width (ft)" onChange={handleChange} />
        <Input type="number" name="length" placeholder="Length (ft)" onChange={handleChange} />
        <Input type="number" name="area" placeholder="Area (sqft)" value={form.area} readOnly />
        
        {activeTab === 'flat' && (
          <Select name="bhk" onChange={handleChange}>
            <option value="">Select BHK</option>
            <option value="1 BHK">1 BHK</option>
            <option value="2 BHK">2 BHK</option>
            <option value="3 BHK">3 BHK</option>
            <option value="4+ BHK">4+ BHK</option>
          </Select>
        )}

        {activeTab === 'shop' && (
          <Input type="text" name="floor" placeholder="Floor (e.g. Ground, 1st)" onChange={handleChange} />
        )}

        <Input
          type="file"
          name="images"
          multiple
          accept="image/*,video/*"
          onChange={handleChange}
          required
        />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
          {images.length > 0 &&
            images.map((file, i) => {
              const url = URL.createObjectURL(file);
              const isVideo = file.type.startsWith('video/');
              return isVideo ? (
                <video
                  key={`${file.name}-${i}`}
                  src={url}
                  width="100"
                  height="80"
                  style={{ borderRadius: '8px' }}
                  controls
                />
              ) : (
                <img
                  key={`${file.name}-${i}`}
                  src={url}
                  alt={`preview-${i}`}
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
              );
            })}
        </div>

        <Button type="submit">Submit</Button>
      </Form>
    </Wrapper>
  );
};

export default AddProperty;