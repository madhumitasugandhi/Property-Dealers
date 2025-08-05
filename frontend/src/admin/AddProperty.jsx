import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0.2rem  2rem;
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
  margin-top: 2rem; /* yeh upar gap dega */
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
    price: '',
    description: '',
    image: '',
    width: '',
    length: '',
    bhk: '',
    plotArea: '',
    facing: '',
    shopSize: '',
    floor: '',
    landArea: '',
    zoning: '',
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
    alert(`Submitted ${activeTab} property`);
  };

  return (
    <Wrapper>
      <h2>Add New Property</h2>

      <Tabs>
        {['flat', 'plot', 'shop', 'land'].map((tab) => (
          <Tab key={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Tab>
        ))}
      </Tabs>

      <Form onSubmit={handleSubmit}>
        <Input type="text" name="title" placeholder="Property Title" onChange={handleChange} required />
        <Input type="text" name="location" placeholder="Location" onChange={handleChange} required />
        <Input type="number" name="price" placeholder="Price" onChange={handleChange} required />

        {activeTab === 'flat' && (
          <>
            <Input type="number" name="width" placeholder="Width (ft)" onChange={handleChange} />
            <Input type="number" name="length" placeholder="Length (ft)" onChange={handleChange} />
            <Select name="bhk" onChange={handleChange}>
              <option value="">Select BHK</option>
              <option value="1 BHK">1 BHK</option>
              <option value="2 BHK">2 BHK</option>
              <option value="3 BHK">3 BHK</option>
              <option value="4+ BHK">4+ BHK</option>
            </Select>
          </>
        )}

        {activeTab === 'plot' && (
          <>
            <Input type="number" name="plotArea" placeholder="Plot Area (sqft)" onChange={handleChange} />
            <Select name="facing" onChange={handleChange}>
              <option value="">Facing</option>
              <option value="East">East</option>
              <option value="West">West</option>
              <option value="North">North</option>
              <option value="South">South</option>
            </Select>
          </>
        )}

        {activeTab === 'shop' && (
          <>
            <Input type="number" name="shopSize" placeholder="Shop Size (sqft)" onChange={handleChange} />
            <Input type="text" name="floor" placeholder="Floor (e.g. Ground, 1st)" onChange={handleChange} />
          </>
        )}

        {activeTab === 'land' && (
          <>
            <Input type="number" name="landArea" placeholder="Land Area (acres)" onChange={handleChange} />
            <Select name="zoning" onChange={handleChange}>
              <option value="">Zoning</option>
              <option value="Agricultural">Agricultural</option>
              <option value="Commercial">Commercial</option>
              <option value="Industrial">Industrial</option>
            </Select>
          </>
        )}

        <Input type="file" name="image" accept="image/*" onChange={handleChange} required />
        <Button type="submit">Submit</Button>
      </Form>
    </Wrapper>
  );
};

export default AddProperty;
