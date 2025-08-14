import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Wrapper = styled.div`
  padding: 0.2rem 2rem;
  background: #f1f5f9;
  min-height: 100vh;
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

const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('flat');
  const [form, setForm] = useState({
    title: '',
    location: '',
    price: '',
    description: '',
    image: null,
    width: '',
    length: '',
    area: '',
    bhk: '',
    floor: '',
    type: 'flat',
    taluka: '', // Added for taluka
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/property/${id}`);
        const property = res.data;
        setForm({
          title: property.title || '',
          location: property.location || '',
          price: property.price || '',
          description: property.description || '',
          image: null,
          width: property.width || '',
          length: property.length || '',
          area: property.area || '',
          bhk: property.bhk || '',
          floor: property.floor || '',
          type: property.type || 'flat',
          taluka: property.taluka || '', // Added for taluka
        });
        setActiveTab(property.type || 'flat');
        setLoading(false);
      } catch (err) {
        console.error('Error fetching property:', err);
        setError('Failed to load property data');
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      setForm({ ...form, image: files[0] });
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

      if (name === 'type') {
        setActiveTab(value);
        updatedForm.type = value;
      }

      setForm(updatedForm);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!form.title || !form.location || !form.price) {
      setError('Title, location, and price are required');
      return;
    }
  
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('location', form.location);
    formData.append('price', form.price);
    formData.append('description', form.description);
    if (form.image) formData.append('image', form.image);
    formData.append('width', form.width);
    formData.append('length', form.length);
    formData.append('area', form.area);
    formData.append('type', form.type);
    formData.append('taluka', form.taluka); // Added for taluka
    if (form.type === 'flat') formData.append('bhk', form.bhk);
    if (form.type === 'shop') formData.append('floor', form.floor);
  
    try {
      await axios.put(`http://localhost:5000/api/property/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Property updated successfully');
      navigate('/admin/properties');
    } catch (err) {
      console.error('Error updating property:', err.response?.data || err.message);
      setError('Failed to update property');
    }
  };

  if (loading) {
    return <Wrapper>Loading...</Wrapper>;
  }

  if (error) {
    return <Wrapper><ErrorMessage>{error}</ErrorMessage></Wrapper>;
  }

  return (
    <Wrapper>
      <h2>Edit Property</h2>
      <Tabs>
        {['flat', 'farm', 'shop', 'land'].map((tab) => (
          <Tab
            key={tab}
            active={activeTab === tab}
            onClick={() => setForm({ ...form, type: tab })}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Tab>
        ))}
      </Tabs>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="title"
          placeholder="Property Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />
        <Input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="taluka"
          placeholder="Taluka"
          value={form.taluka}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="width"
          placeholder="Width (ft)"
          value={form.width}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="length"
          placeholder="Length (ft)"
          value={form.length}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="area"
          placeholder="Area (sqft)"
          value={form.area}
          readOnly
        />
        {activeTab === 'flat' && (
          <Select name="bhk" value={form.bhk} onChange={handleChange}>
            <option value="">Select BHK</option>
            <option value="1 BHK">1 BHK</option>
            <option value="2 BHK">2 BHK</option>
            <option value="3 BHK">3 BHK</option>
            <option value="4+ BHK">4+ BHK</option>
          </Select>
        )}
        {activeTab === 'shop' && (
          <Input
            type="text"
            name="floor"
            placeholder="Floor (e.g. Ground, 1st)"
            value={form.floor}
            onChange={handleChange}
          />
        )}
        <Input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
        {form.image && (
          <img
            src={URL.createObjectURL(form.image)}
            alt="Preview"
            style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '0.5rem' }}
          />
        )}
        <Button type="submit">Update Property</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
    </Wrapper>
  );
};

export default EditProperty;